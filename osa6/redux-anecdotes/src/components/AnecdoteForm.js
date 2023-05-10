import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { controlNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const freshAnecdote = await anecdoteService.createNew(content) 

    dispatch(createNewAnecdote(freshAnecdote))
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