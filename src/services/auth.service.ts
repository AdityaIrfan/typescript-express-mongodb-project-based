import { logger } from '../utils/logger'
import UserModel from './../models/user.model'
import { IUserType, ToWriteUser } from '../types/user.type'

export const CreateUserService = async (user: IUserType): Promise<any> => {
  return await UserModel.create(ToWriteUser(user))
    .then((user) => {
      return user
    })
    .catch((e) => {
      logger.error('FAILED TO CREATE NEW USER : ', e)
    })
}

export const GetUserByEmailService = async (Email: string): Promise<any> => {
  return await UserModel.findOne({ email: Email })
    .then((user) => {
      return user
    })
    .catch((e) => {
      logger.error(`FAILED TO GET USER BY EMAIL [${Email}] : `, e)
    })
}

export const GetUserByIdService = async (id: string): Promise<any> => {
  return await UserModel.findOne({ _id: id })
    .then((user) => {
      return user
    })
    .catch((error) => {
      logger.error('FAILED TO GET USER BY ID : ', error)
    })
}
