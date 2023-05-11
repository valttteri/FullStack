import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      console.log(JSON.parse(JSON.stringify(state)))
      console.log(JSON.parse(JSON.stringify(action)))

      const id = action.payload
      const votedAnecdote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      return state.map(a => a.id !== id ? a : updatedAnecdote)
    },
    appendAnecdote(state, action) {
      const anecdote = {
        content: action.payload.content,
        id: action.payload.id,
        votes: action.payload.votes
      }
      //console.log('appendAnecdote', anecdote)
      state.push(anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
} 

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const data = {
      content: content,
      votes: 0
    }
    const anecdote = await anecdoteService.createNew(data)

    dispatch(appendAnecdote(anecdote))
  }
}


export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer