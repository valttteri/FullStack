import { useQuery } from 'react-query'
import axios from 'axios'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  //const anecdotes = [
  //  {
  //    "content": "If it hurts, do it more often",
  //    "id": "47145",
  //    "votes": 0
  //  },
  //]
  
  const result = useQuery(
    'anecdotes',
    () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    {
      retry: false
    }
  )
  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.error ) {
    return <div>unable to load page</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
