import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import { logger } from './utils/logger'
import { routes } from './routes'

// connect DB
import './utils/connectDB'
import { DeserializedToken } from './middleware/deserializedToken'

const app: Application = express()
const port: number = 4000

// Parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors access handlers
app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Header', '*')
  next()
})

app.use(DeserializedToken)

routes(app)

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`)
})
