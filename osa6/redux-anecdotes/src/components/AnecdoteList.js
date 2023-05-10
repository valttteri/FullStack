import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { controlNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if ( state.filter === 'NO_FILTER' ) {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.includes(state.filter) === true)
  })

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(controlNotification(anecdote.content))
    setTimeout(() => {
      dispatch(controlNotification('hide'))
    }, 5000)
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}    
    </div>
  )
}

export default AnecdoteList