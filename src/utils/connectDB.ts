import mongoose from 'mongoose'
import CONFIG from '../config/environment'
import { logger } from './logger'
import * as process from 'process'

mongoose
  .connect(CONFIG.DB ?? '')
  .then(() => {
    logger.info('Connected to MONGO DB')
  })
  .catch((e) => {
    logger.info('Could not connect to MONGO DB')
    logger.error(e)
    process.exit(1)
  })
