import { createSlice } from '@reduxjs/toolkit'

const initialState = 'NO_FILTER'

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

/*

const filterReducer = (state = 'NO_FILTER', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'SET_FILTER':
      return state=action.payload.filter
    default: return state
  }
}
  
export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    payload: { filter },
  }
}
  
  export default filterReducer


*/