/// <reference types="jest" />
import express from 'express'
import { App } from 'myapp'
import { GLOBAL } from 'config/global'
import request from 'supertest'
import mongoose from 'mongoose'

let app: express.Application

beforeAll(async () => {
  await mongoose.connect(GLOBAL.DB_URI || '')
  app = await App.app()
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('User Route', () => {
  let userId: string
  it('should create a user', async () => {
    const res = await request(app).post('/api/v1/auth/user').send({
      firstname: 'John_test',
      lastname : 'Doe',
      email    : 'john_test@example.com',
      password : '123456'
    })

    expect(res.statusCode).toBe(201)
    expect(res.body.data).toHaveProperty('_id')
    userId = res.body.data._id
  })

  it('should throw unsuccessful response if user already exists', async () => {
    const res = await request(app).post(`/api/v1/auth/user`).send({ email: 'john_test@example.com' })

    expect(res.statusCode).toBe(409)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toMatch(/Document already exists/i)
  })

  it('should get all users', async () => {
    const res = await request(app).get('/api/v1/auth/user')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  it('should get a user by id', async () => {
    const res = await request(app).get(`/api/v1/auth/user/${userId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.data).toHaveProperty('_id', userId)
  })

  it('should update a user', async () => {
    const res = await request(app).put(`/api/v1/auth/user/${userId}`).send({ firstname: 'Jane' })

    expect(res.statusCode).toBe(200)
    expect(res.body.data.firstname).toBe('Jane')
  })

  it('should throw unsuccessful response if user does not exist', async () => {
    const fakeId = new mongoose.Types.ObjectId().toHexString()
    const res    = await request(app).put(`/api/v1/auth/user/${fakeId}`).send({ firstname: 'Ghosty' })

    expect(res.statusCode).toBe(404)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toMatch(/Failed to find the requested document/i)
  })

  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/v1/auth/user/${userId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.data).toStrictEqual({})
  })
   it('should throw unsuccessful response if user does not exist before delete', async () => {
    const fakeId = new mongoose.Types.ObjectId().toHexString()
    const res    = await request(app).delete(`/api/v1/auth/user/${fakeId}`).send({ firstname: 'Huey' })

    expect(res.statusCode).toBe(404)
    expect(res.body.success).toBe(false)
    expect(res.body.message).toMatch(/Failed to find the requested document/i)
  })
})
