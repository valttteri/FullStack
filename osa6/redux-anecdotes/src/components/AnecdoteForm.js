import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { controlNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createNewAnecdote(content))
    dispatch(controlNotification(content))
    
    setTimeout(() => {
      dispatch(controlNotification('hide'))
    }, 5000)
  }
    
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(newAnecdote)}> 
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm