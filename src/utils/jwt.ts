import jwt, { Secret } from 'jsonwebtoken'
import CONFIG from './../config/environment'
import { IUserType } from '../types/user.type'

export const GenerateToken = (user: IUserType, options?: jwt.SignOptions | undefined): string => {
  const payload = {
    id: user.Id,
    name: user.Name,
    role: user.Role
  }

  return jwt.sign(payload, CONFIG.JWT.PRIVATE_KEY as Secret, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export const GenerateRefreshToken = (user: IUserType, options?: jwt.SignOptions | undefined): string => {
  const payload = {
    id: user.Id,
    role: user.Role
  }

  return jwt.sign(payload, CONFIG.JWT.REFRESH_PRIVATE_KEY as Secret, {
    ...(options && options),
    algorithm: 'RS256'
  })
}

export const VerifyToken = (token: string): any => {
  try {
    const decoded: any = jwt.verify(token, CONFIG.JWT.PUBLIC_KEY as Secret)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null
    }
  }
}

export const VerifyRefreshToken = (token: string): any => {
  try {
    const decoded: any = jwt.verify(token, CONFIG.JWT.REFRESH_PUBLIC_KEY as Secret)
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null
    }
  }
}
