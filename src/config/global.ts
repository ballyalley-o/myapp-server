import type { Connection } from 'mongoose'
import { tenMin, oneDay } from 'constant'
import dotenv from 'dotenv'
dotenv.config()


export const GLOBAL = {
  APP_NAME       : process.env.APP_NAME || 'myapp',
  ENV            : process.env.ENV || 'development',
  PORT           : process.env.PORT || 3007,
  API_URL        : process.env.API_URL || '',
  API_VERSION    : process.env.API_VERSION || 'v1',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || [],
  DB_URI         : process.env.DB_URI,
  DB_NAME        : (con: Connection) => con.name || 'sampleapp',
  DB_HOST        : (con: Connection) => con.host || '',
  ENCRYPTION     : {
    ENCODING: process.env.ENCRYPTION_ENCODING || '',
    ALG     : process.env.ENCRYPTION_ALG || '',
  },
  RATE_LIMIT: {
    windowMs: tenMin,
    max     : 100,
  },
  LOG_LEVEL        : 'info',
  LOG_FILENAME_ERR : 'log/error.log',
  LOG_FILENAME_COMB: 'log/combined.log',
  PAGINATION       : {
    DEFAULT_PAGE: 1,
    LIMIT       : 25
  },
  JWT_EXP          : oneDay,
  JWT_SECRET       : process.env.JWT_SECRET || '',
}
