const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'First test blog',
    author: 'Tester',
    url: 'http://test1.com',
    likes: 5
  },
  {
    title: 'Second test blog',
    author: 'Tester',
    url: 'http://test2.com',
    likes: 10
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('GET /api/blogs', () => {
  test('returns blogs as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unique identifier property of blogs is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  for (const blog of blogs) {
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  }
})

  test('returns correct number of blog posts', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

describe('POST /api/blogs', () => {
  test('successfully creates a new blog post', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Test Author',
      url: 'http://example.com/new',
      likes: 7
    }

    const blogsAtStart = await api.get('/api/blogs')

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length + 1)

    const titles = blogsAtEnd.body.map(b => b.title)
    expect(titles).toContain('New Blog Post')
  })

  test('defaults likes to 0 if missing from request', async () => {
    const newBlog = {
      title: 'No Likes Blog',
      author: 'Zero Tester',
      url: 'http://nolikes.com'
      // likes is intentionally missing
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })
  test('fails with status 400 if title is missing', async () => {
  const blogMissingTitle = {
    author: 'Author',
    url: 'http://url.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blogMissingTitle)
    .expect(400)
})

  test('fails with status 400 if url is missing', async () => {
    const blogMissingUrl = {
      title: 'Missing URL',
      author: 'Author',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(blogMissingUrl)
      .expect(400)
  })
})


describe('DELETE /api/blogs', () => {
  test('successfully deletes a blog by id', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length - 1)

    const ids = blogsAtEnd.body.map(b => b.id)
    expect(ids).not.toContain(blogToDelete.id)
  })
})


describe('PUT /api/blogs', () => {
  test('successfully updates likes of a blog post', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]

    const updatedLikes = blogToUpdate.likes + 1
    const updatedData = { ...blogToUpdate, likes: updatedLikes }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(updatedLikes)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})
