import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async ({ content, votes }) => {
  const anecdote = { content: content, votes: votes }
  //console.log('axiosin näkymä', content)
  const res = await axios.post(baseUrl, anecdote)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  createNew
}