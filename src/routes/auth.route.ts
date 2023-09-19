import { Router } from 'express'
import { LoginController, RefreshTokenController, RegisterController } from '../controllers/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', RegisterController)
AuthRouter.post('/login', LoginController)
AuthRouter.post('/refresh', RefreshTokenController)
