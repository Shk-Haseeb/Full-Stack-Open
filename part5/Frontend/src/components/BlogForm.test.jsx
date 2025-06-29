import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls onCreateBlog with correct details when submitted', async () => {
    const mockCreate = vi.fn()
    render(<BlogForm createBlog={mockCreate} />)

    const user = userEvent.setup()

    const titleInput = screen.getByLabelText(/title:/i)
    const authorInput = screen.getByLabelText(/author:/i)
    const urlInput = screen.getByLabelText(/url:/i)
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'Testing Blog Creation')
    await user.type(authorInput, 'Jane Developer')
    await user.type(urlInput, 'https://example.com/test-blog')
    await user.click(createButton)

    expect(mockCreate).toHaveBeenCalledTimes(1)
    expect(mockCreate).toHaveBeenCalledWith({
      title: 'Testing Blog Creation',
      author: 'Jane Developer',
      url: 'https://example.com/test-blog',
    })
  })
})
