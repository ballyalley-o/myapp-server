import dotenv from 'dotenv'
dotenv.config()

export const GLOBAL = {
  APP_NAME       : process.env.APP_NAME || 'myapp',
  ENV            : process.env.ENV || 'development',
  PORT           : process.env.PORT || 3007,
  API_URL        : process.env.API_URL || '',
  API_VERSION    : process.env.API_VERSION || 'v1',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map((s) => s.trim()): [],
  COOKIE         : {
    NAME: process.env.COOKIE_NAME || '',
    EXP :  new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  DB_URI    : process.env.DB_URI || '',
  DB_NAME   : (con: { name: string }) => con.name || 'sampleapp',
  DB_HOST   : (con: { host: string }) => con.host || '',
  ENCRYPTION: {
    ENCODING: process.env.ENCRYPTION_ENCODING || '',
    ALG: process.env.ENCRYPTION_ALG || '',
  },
  HASH   : {
  TYPE       : process.env.HASH_TYPE || 'argon2id',
  MEMORY_COST: parseInt(process.env.HASH_MEMORY_COST || '19456', 10),
  TIME_COST  : parseInt(process.env.HASH_TIME_COST || '2', 10),
  PARALLELISM: parseInt(process.env.HASH_PARALLELISM || '1', 10),
  },
  RATE_LIMIT: {
    windowMs: 10 * 60 * 1000,
    max     : process.env.MAX_RATE_LIMIT
  },
  LOG_LEVEL        : 'info',
  LOG_FILENAME_ERR : 'log/error.log',
  LOG_FILENAME_COMB: 'log/combined.log',
  PAGINATION       : {
    DEFAULT_PAGE: 1,
    LIMIT       : 25,
  },
  JWT_EXP   : 24 * 60 * 60 * 1000,
  JWT_SECRET: process.env.JWT_SECRET || '',
}
