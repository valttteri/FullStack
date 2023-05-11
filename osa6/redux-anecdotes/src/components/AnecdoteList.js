import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if ( state.filter === 'NO_FILTER' ) {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.includes(state.filter) === true)
  })

  const vote = (id, content, votes) => {
    dispatch(voteAnecdote(id, content, votes))
    dispatch(setNotification(`you voted '${content}'`, 3))
  }

  const Anecdote = ({ vote, anecdote }) => {
    return (
      <div>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
        </div>
      </div>
    )
  }

  return (
    anecdotes
      .slice()
      .sort((a, b) => a.votes <= b.votes ? 1 : -1)
      .map((anecdote) =>
      <div key={anecdote.id}>
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      </div>
    )    
  )
}

export default AnecdoteList