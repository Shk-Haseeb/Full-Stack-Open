const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const user = new User({
    username: 'root',
    name: 'Root User',
    passwordHash: 'hashedpw'
  })
  await user.save()
})

describe('creating users', () => {
  test('fails with short username', async () => {
    const newUser = {
      username: 'ab',
      name: 'Shorty',
      password: 'validpass'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('Username must be at least')
  })

  test('fails with short password', async () => {
    const newUser = {
      username: 'validuser',
      name: 'BadPass',
      password: 'pw'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('Password must be at least')
  })

  test('fails with duplicate username', async () => {
    const newUser = {
      username: 'root',
      name: 'Duplicate',
      password: 'validpass'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('Username must be unique')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
