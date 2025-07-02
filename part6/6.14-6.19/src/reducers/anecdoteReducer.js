import { createSlice } from '@reduxjs/toolkit'
import { createNew, getAll, update } from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(a => a.id === updated.id ? updated : a)
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdoteToUpdate = getState().anecdotes.find(a => a.id === id)
    const updatedAnecdote = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1
    }

    const response = await update(updatedAnecdote)
    dispatch(updateAnecdote(response))
  }
}

export default anecdoteSlice.reducer