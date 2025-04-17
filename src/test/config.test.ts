/// <reference types="jest" />
import dotenv from 'dotenv'
dotenv.config()

import { GLOBAL } from 'config/global'

describe('Environment Variables', () => {
  it('should load DB_URI from .env', () => {
    expect(process.env.DB_URI).toBeDefined()
    expect(process.env.DB_URI).not.toBe(undefined)
  })

  it('should load GLOBAL values', () => {
    expect(GLOBAL.DB_URI).toBeDefined()
    expect(GLOBAL.DB_URI).not.toBe(undefined)
  })
})
