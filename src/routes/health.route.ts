import { Response, Router } from 'express'
import { logger } from '../utils/logger'
import { SuccessResponse } from '../core/apiResponse'

export const HealthRouter: Router = Router()

// {url}/health
HealthRouter.get('/', (req, res: Response) => {
  logger.info('Health check success')
  return new SuccessResponse("I'm healthy").send(res)
})
