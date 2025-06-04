const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
require('dotenv').config()

const app = express()

const mongoUrl = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app
