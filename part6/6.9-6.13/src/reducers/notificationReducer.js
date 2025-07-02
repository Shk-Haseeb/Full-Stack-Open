import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotificationMessage, clearNotification } = notificationSlice.actions

export const setNotification = (message, durationInSeconds = 5) => {
  return dispatch => {
    dispatch(setNotificationMessage(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, durationInSeconds * 1000)
  }
}

export default notificationSlice.reducer
