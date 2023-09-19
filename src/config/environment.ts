import * as process from 'process'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()

const CONFIG = {
  DB: process.env.DB_MONGO,
  JWT: {
    PRIVATE_KEY: fs.readFileSync(__dirname.replace('src/config', 'private_key.pem'), 'utf8'),
    PUBLIC_KEY: fs.readFileSync(__dirname.replace('src/config', 'public_key.pem'), 'utf8'),
    REFRESH_PRIVATE_KEY: fs.readFileSync(__dirname.replace('src/config', 'refresh_private_key.pem'), 'utf8'),
    REFRESH_PUBLIC_KEY: fs.readFileSync(__dirname.replace('src/config', 'refresh_public_key.pem'), 'utf8')
  }
}

export default CONFIG
