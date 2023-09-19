import { NextFunction, Request, Response } from 'express'
import { ForbiddenResponse } from '../core/apiResponse'
import { USER_ROLE } from '../types/user.type'

export const AuthClient = (req: Request, res: Response, next: NextFunction): any => {
  const user = res.locals.user

  if (!user) {
    return new ForbiddenResponse().send(res)
  }

  if (user.role !== USER_ROLE.CLIENT) {
    return new ForbiddenResponse().send(res)
  }

  next()
}

export const AuthAdmin = (req: Request, res: Response, next: NextFunction): any => {
  const user = res.locals.user

  if (!user) {
    return new ForbiddenResponse().send(res)
  }

  if (user.role !== USER_ROLE.ADMIN) {
    return new ForbiddenResponse().send(res)
  }

  next()
}

export const AuthClientAndAdmin = (req: Request, res: Response, next: NextFunction): any => {
  const user = res.locals.user

  if (!user) {
    return new ForbiddenResponse().send(res)
  }

  if (user.role !== USER_ROLE.ADMIN && user.role !== USER_ROLE.CLIENT) {
    return new ForbiddenResponse().send(res)
  }

  next()
}
