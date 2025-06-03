const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
require('dotenv').config()

const app = express()

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app
