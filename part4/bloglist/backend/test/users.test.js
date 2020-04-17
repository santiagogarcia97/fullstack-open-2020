const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('getting users', () => {
  test('users are returned as json', async () => {
    const usersAtStart = await helper.usersInDb()

    const usersAtEnd = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(usersAtEnd.body).toHaveLength(usersAtStart.length)
  })

  test("users have an id property", async () => {
    const blogs = await api.get("/api/blogs")
    expect(blogs.body[0].id).toBeDefined()
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'qwerty',
      name: 'asfasfasf',
      password: 'secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('check create user validations', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('users cant be created without username', async () => {
    const newUser = {
      password: "asdasd",
      name: "qeqwe"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('users cant be created without password', async () => {
    const newUser = {
      username: "asdasd",
      name: "qeqwe"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('users cant be created with less than 3 chars username', async () => {
    const newUser = {
      username: "as",
      password: "asdasd",
      name: "qeqwe"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('users cant be created with less than 3 chars password', async () => {
    const newUser = {
      username: "asasaf",
      password: "a",
      name: "qeqwe"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('username cant be repeated', async () => {
    const newUser = {
      username: "root",
      password: "asadasd",
      name: "qeqwe"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})