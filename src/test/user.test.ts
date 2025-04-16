import request from 'supertest'
import mongoose from 'mongoose'
import { App } from 'myapp'

const app = App.app

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI || '')
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('User Route', () => {
  let userId: string;
  it('should create a user', async () => {
    const res = await request(app).post('/auth/user').send({
      firstname: 'John',
      lastname : 'Doe',
      email    : 'john@example.com',
      password : '123456',
    })

    expect(res.statusCode).toBe(201)
    expect(res.body.data).toHaveProperty('_id')
    userId = res.body.data._id
  })

  it('should get all users', async () => {
    const res = await request(app).get('/auth/user')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.data)).toBe(true)
  })

  it('should get a user by id', async () => {
    const res = await request(app).get(`/auth/user/${userId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.data).toHaveProperty('_id', userId)
  })

  it('should update a user', async () => {
    const res = await request(app).put(`/auth/user/${userId}`).send({ firstname: 'Jane' })

    expect(res.statusCode).toBe(200)
    expect(res.body.data.firstname).toBe('Jane')
  })

  it('should delete a user', async () => {
    const res = await request(app).delete(`/auth/user/${userId}`)
    expect(res.statusCode).toBe(200)
  })
})


