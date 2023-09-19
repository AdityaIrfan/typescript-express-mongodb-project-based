import { IUserType } from '../types/user.type'
import Joi from 'joi'

export function RegisterValidation(payload: IUserType): Joi.ValidationResult<any> {
  const schema = Joi.object({
    Email: Joi.string().required().email(),
    Name: Joi.string().required(),
    Password: Joi.string().required()
  })

  return schema.validate(payload)
}

export function LoginValidation(payload: IUserType): Joi.ValidationResult<any> {
  const schema = Joi.object({
    Email: Joi.string().required().email(),
    Password: Joi.string().required()
  })

  return schema.validate(payload)
}

export function RefreshTokenValidation(payload: any): Joi.ValidationResult<any> {
  const schema = Joi.object({
    RefreshToken: Joi.string().required()
  })

  return schema.validate(payload)
}
