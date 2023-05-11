import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    const votedAnecdote = {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes + 1
    }
    newAnecdoteMutation.mutate(votedAnecdote)
  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: false
    }
  )
  console.log('result:', result)

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
