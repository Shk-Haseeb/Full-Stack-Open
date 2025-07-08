import { render, screen } from '@testing-library/react'
import TodoView from './TodoView'
import { test } from 'vitest'

test('renders todo text', () => {
  const todo = { text: 'Learn Docker', done: false }
  render(<TodoView todo={todo} />)
  screen.getByText(/Learn Docker/)
})
