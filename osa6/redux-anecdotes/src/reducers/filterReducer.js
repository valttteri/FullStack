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