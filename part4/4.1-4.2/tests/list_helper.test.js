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
