import { createSlice } from '@reduxjs/toolkit'

const initialState = 'hide'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    controlNotification(state, action) {
      //console.log(action.payload)
      return state = action.payload
    }
  }
})

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(controlNotification(message))
    setTimeout(() => {
      dispatch(controlNotification('hide'))
    }, time*1000)
  }
}

export const { controlNotification } = notificationSlice.actions
export default notificationSlice.reducer