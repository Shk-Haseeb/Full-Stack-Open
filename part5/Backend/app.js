const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')




require('dotenv').config()

const app = express()

const mongoUrl = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.use(express.json())
app.use('/api/blogs', middleware.userExtractor, blogRouter)

const userRouter = require('./controllers/users')
app.use('/api/users', userRouter)

const loginRouter = require('./controllers/login')
app.use('/api/login', loginRouter)

app.use(middleware.tokenExtractor)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}


module.exports = app
