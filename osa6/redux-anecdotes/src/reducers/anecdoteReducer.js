import { createSlice } from '@reduxjs/toolkit'

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
    createNewAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload.content,
        id: action.payload.id,
        votes: action.payload.votes
      }
      return state.concat(newAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, createNewAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer