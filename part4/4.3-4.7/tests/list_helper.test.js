const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

// Dummy test
test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

// Total Likes tests
describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list is empty, return 0', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has many blogs, return total likes', () => {
    const blogs = [
      { title: 'Blog A', author: 'Author A', url: 'url', likes: 3 },
      { title: 'Blog B', author: 'Author B', url: 'url', likes: 7 },
      { title: 'Blog C', author: 'Author C', url: 'url', likes: 2 }
    ]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 12)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      title: 'Blog A',
      author: 'Author A',
      url: 'url-a',
      likes: 3
    },
    {
      title: 'Blog B',
      author: 'Author B',
      url: 'url-b',
      likes: 12
    },
    {
      title: 'Blog C',
      author: 'Author C',
      url: 'url-c',
      likes: 7
    }
  ]

  test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)

    const expected = {
      title: 'Blog B',
      author: 'Author B',
      url: 'url-b',
      likes: 12
    }

    assert.deepStrictEqual(result, expected)
  })

  test('returns null for empty list', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })
})

describe('most blogs', () => {
  const blogs = [
    { title: 'Blog A', author: 'Alice', likes: 2 },
    { title: 'Blog B', author: 'Bob', likes: 4 },
    { title: 'Blog C', author: 'Alice', likes: 3 },
    { title: 'Blog D', author: 'Alice', likes: 1 },
    { title: 'Blog E', author: 'Bob', likes: 5 }
  ]

  test('returns the author with the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)

    const expected = {
      author: 'Alice',
      blogs: 3
    }

    assert.deepStrictEqual(result, expected)
  })

  test('returns null for empty list', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, null)
  })
})


describe('most likes', () => {
  const blogs = [
    { title: 'Blog A', author: 'Alice', likes: 4 },
    { title: 'Blog B', author: 'Bob', likes: 6 },
    { title: 'Blog C', author: 'Alice', likes: 3 },
    { title: 'Blog D', author: 'Bob', likes: 8 },
    { title: 'Blog E', author: 'Charlie', likes: 2 }
  ]

  test('returns the author with the most total likes', () => {
    const result = listHelper.mostLikes(blogs)

    const expected = {
      author: 'Bob',
      likes: 14
    }

    assert.deepStrictEqual(result, expected)
  })

  test('returns null for empty list', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, null)
  })
})
