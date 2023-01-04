import { config } from 'dotenv'
import * as process from 'process'

config({ path: '.env' })

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export const isDevelopment = process.env.NODE_ENV === 'development'

console.log('isDevelopment:', isDevelopment)

export const env = process.env
