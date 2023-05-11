import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const req = await axios.get(baseUrl)
  return req.data
}

const createNew = async ({ content, votes }) => {
  const anecdote = { content: content, votes: votes }
  //console.log('axiosin näkymä', content)
  const req = await axios.post(baseUrl, anecdote)
  return req.data
}

const updateAnecdote = async (anecdote) => {
  const req = axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  //console.log('axiosin update data:', req.data)
  return req.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  createNew,
  updateAnecdote
}