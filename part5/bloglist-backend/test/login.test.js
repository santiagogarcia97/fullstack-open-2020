const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await helper.initLoginTest()
})

describe('testing login', () => {
  test('login with no data', async () => {
    await api
      .post('/api/login')
      .send({})
      .expect(400)
  })
  test('login with no username', async () => {
    await api
      .post('/api/login')
      .send({password: 'pass1'})
      .expect(400)
  })
  test('login with no password', async () => {
    await api
      .post('/api/login')
      .send({username: 'user1'})
      .expect(400)
  })
  test('login with invalid username', async () => {
    await api
      .post('/api/login')
      .send({username: 'user2', password: 'pass1'})
      .expect(401)
  })
  test('login with invalid password', async () => {
    await api
      .post('/api/login')
      .send({username: 'user1', password: 'pass2'})
      .expect(401)
  })
  test('login with valid information', async () => {
    const res = await api
      .post('/api/login')
      .send({username: 'user1', password: 'pass1'})
      .expect(200)

    expect(res.body).toHaveProperty('username', 'user1')
    expect(res.body.token).toBeDefined()
    expect(res.body.name).toBeDefined()
  })

})


afterAll(() => {
  mongoose.connection.close()
})