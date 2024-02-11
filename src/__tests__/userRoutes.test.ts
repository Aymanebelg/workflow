import request from 'supertest'
import express from 'express'
import userRoutes from '../routes/userRoutes'

const app = express()
app.use(express.json())
app.use('/users', userRoutes)

describe('User Management API', () => {
  it('should create a new user', async () => {
    const newUser = { id: 1, name: 'John Doe' }

    const response = await request(app)
      .post('/users')
      .send(newUser)

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual(newUser)
  })

  it('should retrieve all users', async () => {
    const response = await request(app).get('/users')

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeGreaterThanOrEqual(1) // Since we added a user in the previous test
  })
})

describe('Ping Test', () => {
  it('GET /ping - should respond with pong', async () => {
    const response = await request(app).get('/users/ping')
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('pong') // Checking the response body directly
  })
})
