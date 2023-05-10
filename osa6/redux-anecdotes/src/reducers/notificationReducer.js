import { createSlice } from '@reduxjs/toolkit'

const initialState = 'hide'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    controlNotification(state, action) {
      return state = action.payload
    }
  }
})

export const { controlNotification } = notificationSlice.actions
export default notificationSlice.reducer


/*

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      console.log('filter state: ', state)
      console.log('filter action', action)
      return state = action.payload
    }
  }
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer

*/