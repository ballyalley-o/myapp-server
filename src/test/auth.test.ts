/// <reference types="jest" />

import express from 'express'
import { App } from 'myapp'
import { GLOBAL } from 'config/global'
import request from 'supertest'
import mongoose from 'mongoose'

let app: express.Application

const userPayload = {
  firstname: 'Test_automated',
  lastname : 'Jane',
  email    : 'jane-test@test.com',
  password : '123456',
}

describe('Auth Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(GLOBAL.DB_URI || '', { dbName: '_mock' })
    app = await App.app()
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
  })
  it('should create a new user and return a token', async () => {
    const res = await request(app).post('/api/v1/auth/sign-up').send(userPayload)
    expect(res.statusCode).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.key).toBeDefined()
  })

  it('should return 409: Conflict if user already exists', async () => {
    const res = await request(app).post('/api/v1/auth/sign-up').send(userPayload)
    expect(res.statusCode).toBe(409)
  })

  it('should sign in and return token', async () => {
    const res = await request(app).post('/api/v1/auth/sign-in').send({
      email: userPayload.email,
      password: userPayload.password,
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.key).toBeDefined()
  })

  it('should return error on invalid credentials', async () => {
    const res = await request(app).post('/api/v1/auth/sign-in').send({
      email: userPayload.email,
      password: 'wrongpassword',
    })
    expect(res.statusCode).toBe(401)
  })

  describe('myAccount', () => {
    let token: string

    beforeAll(async () => {
      const res = await request(app).post('/api/v1/auth/sign-in').send({
        email: userPayload.email,
        password: userPayload.password,
      })
      token = res.body.key
    })
    it('should get user details when authenticated', async () => {
      const res = await request(app).get('/auth/me').set('Cookie', `${GLOBAL.COOKIE.NAME}=${token}`)
      expect(res.statusCode).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.data.email).toBe(userPayload.email)
    })
  })

  describe('signOut', () => {
    it('should clear the auth cookie', async () => {
      const res = await request(app).get('/api/v1/auth/sign-out')
      expect(res.statusCode).toBe(200)
      expect(res.headers['set-cookie']).toBeDefined()
    })
  })
})
