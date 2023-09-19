import { NextFunction, Request, Response } from 'express'
import { VerifyToken } from '../utils/jwt'

export const DeserializedToken = (req: Request, res: Response, next: NextFunction): any => {
  const accessToken: any = req.headers.authorization?.replace(/^Bearer\s/, '')

  if (!accessToken) {
    next()
  }

  const { valid, expired, decoded } = VerifyToken(accessToken)

  if (!valid || expired) {
    next()
  }

  res.locals.user = decoded

  next()
}
