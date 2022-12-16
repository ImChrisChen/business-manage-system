import { config } from 'dotenv'
import * as process from 'process'

config({ path: '.env' })

export const isDevelopment = process.env.NODE_ENV === 'development'

export const env = process.env
