import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if ( state.filter === 'NO_FILTER' ) {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.includes(state.filter) === true)
  })

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes
        .slice()
        .sort((a, b) => a.votes <= b.votes ? 1 : -1)
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}    
    </div>
  )
}

export default AnecdoteList