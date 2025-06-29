import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'The React Testing Guide',
    author: 'Testy McTestface',
    url: 'https://example.com/react-testing',
    likes: 5,
    user: { username: 'tester', name: 'Test User' },
  }

  const currentUser = { username: 'tester' }

  test('renders blog url and likes when view button is clicked', async () => {
  const blog = {
    title: 'The React Testing Guide',
    author: 'Testy McTestface',
    url: 'https://example.com/react-testing',
    likes: 5,
    user: { username: 'tester', name: 'Test User' },
  }

  const currentUser = { username: 'tester' }

    render(
      <Blog
        blog={blog}
        onLike={() => {}}
        onDelete={() => {}}
        currentUser={currentUser}
      />
    )

    const viewButton = screen.getByText('view')
    await viewButton.click()

    expect(screen.getByText('https://example.com/react-testing')).toBeInTheDocument()
    expect(screen.getByText('likes 5')).toBeInTheDocument()
  })

  test('renders title and author, but not url or likes by default', () => {
    render(
      <Blog
        blog={blog}
        onLike={() => {}}
        onDelete={() => {}}
        currentUser={currentUser}
      />
    )

    const summary = screen.getByText(/The React Testing Guide.*Testy McTestface/)
    expect(summary).toBeInTheDocument()

    const details = screen.queryByText(/https:\/\/example\.com/)
    expect(details).not.toBeInTheDocument()

    const likes = screen.queryByText(/likes 5/)
    expect(likes).not.toBeInTheDocument()
  })

  test('calls onLike twice when like button is clicked twice', async () => {
  const blog = {
    title: 'The React Testing Guide',
    author: 'Testy McTestface',
    url: 'https://example.com/react-testing',
    likes: 5,
    user: { username: 'tester', name: 'Test User' },
  }

  const currentUser = { username: 'tester' }

  const mockLikeHandler = vi.fn()
    render(
      <Blog
        blog={blog}
        onLike={mockLikeHandler}
        onDelete={() => {}}
        currentUser={currentUser}
      />
    )

    const viewButton = screen.getByText('view')
    await viewButton.click()

    const likeButton = screen.getByText('like')

    await likeButton.click()
    await likeButton.click()

    expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  })

})
