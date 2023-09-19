import { Request, Response } from 'express'
import { LoginValidation, RefreshTokenValidation, RegisterValidation } from '../validation/auth.validation'
import {
  AccessTokenResponse,
  BadRequestResponse,
  SuccessResponse,
  UnauthorizedResponse,
  UnprocessableEntityResponse
} from '../core/apiResponse'
import { JoiErrorMessage } from '../core/errMessage.helper'
import { CreateUserService, GetUserByEmailService, GetUserByIdService } from '../services/auth.service'
import { ComparePassword, Hashing } from '../utils/hashing'
import { GenerateRefreshToken, GenerateToken, VerifyRefreshToken } from '../utils/jwt'
import { IUserType, TransformUserModelToIUserType, USER_ROLE } from '../types/user.type'
import { logger } from '../utils/logger'

export const RegisterController = async (req: Request, res: Response): Promise<Response> => {
  const { error, value } = RegisterValidation(req.body)
  if (error) {
    return new BadRequestResponse(JoiErrorMessage(error)).send(res)
  }

  try {
    const user = await GetUserByEmailService(value.Email)
    if (user) {
      return new BadRequestResponse('Email is already in use').send(res)
    }

    value.Password = Hashing(value.Password)
    value.Role = USER_ROLE.CLIENT
    await CreateUserService(value)
    return new SuccessResponse('register success, please login').send(res)
  } catch (error) {
    return new UnprocessableEntityResponse().send(res)
  }
}

export const LoginController = async (req: Request, res: Response): Promise<Response> => {
  const { error, value } = LoginValidation(req.body)
  if (error) {
    return new BadRequestResponse(JoiErrorMessage(error)).send(res)
  }

  try {
    const user = await GetUserByEmailService(value.Email)
    if (!user) {
      return new BadRequestResponse('User not found, please register').send(res)
    }

    const isPasswordMatch = ComparePassword(value.Password, user.password)
    if (!isPasswordMatch) {
      return new BadRequestResponse('Password does not match').send(res)
    }

    const iUserType: IUserType = TransformUserModelToIUserType(user)
    const accessToken = GenerateToken(iUserType, { expiresIn: '1d' })
    const refreshToken = GenerateRefreshToken(iUserType, { expiresIn: '1m' })

    const payloadJWT = {
      AccessToken: accessToken,
      RefreshToken: refreshToken
    }

    return new AccessTokenResponse('login success', payloadJWT).send(res)
  } catch (error) {
    return new UnprocessableEntityResponse().send(res)
  }
}

export const RefreshTokenController = async (req: Request, res: Response): Promise<Response> => {
  const { error, value } = RefreshTokenValidation(req.body)
  if (error) {
    return new BadRequestResponse(JoiErrorMessage(error)).send(res)
  }

  try {
    const { valid, expired, decoded } = VerifyRefreshToken(value.RefreshToken)
    console.log(valid, expired)
    if (!valid && expired) {
      logger.error('JWT IS NOT VALID')
      return new UnauthorizedResponse().send(res)
    }

    const user = await GetUserByIdService(decoded.id)
    if (!user) {
      return new UnauthorizedResponse().send(res)
    }

    const iUserType: IUserType = TransformUserModelToIUserType(user)
    const accessToken = GenerateToken(iUserType, { expiresIn: '1d' })
    const refreshToken = GenerateRefreshToken(iUserType, { expiresIn: '1m' })

    const payloadJWT = {
      AccessToken: accessToken,
      RefreshToken: refreshToken
    }
    return new AccessTokenResponse('refresh token success', payloadJWT).send(res)
  } catch (e) {
    logger.error('FAILED TO REFRESH TOKEN : ', e)
    return new UnprocessableEntityResponse().send(res)
  }
}
