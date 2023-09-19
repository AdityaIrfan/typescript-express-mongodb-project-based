import bcrypt from 'bcrypt'
import { logger } from './logger'

// encode
export const Hashing = (password: string): string => {
  return bcrypt.hashSync(password, 10)
}

export const ComparePassword = (password: string, encryptedPassword: string): any => {
  try {
    return bcrypt.compare(password, encryptedPassword)
  } catch (error) {
    logger.error('FAILED TO COMPARE PASSWORD : ', error)
  }
}
