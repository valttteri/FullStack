import { useState } from 'react'
 
const BlogForm = ({ addPost }) => {

  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')

  const handlePostCreating = (event) => {
    event.preventDefault()
    
    addPost(newTitle, newAuthor, newUrl)

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }
   
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  return (
    <div>
      <h3>create a new post</h3>
      <form onSubmit={handlePostCreating}>
        <div>
          title:
            <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={handleTitleChange}
            />
        </div>
        <div>
          author:
            <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleAuthorChange}
            />
        </div>
        <div>
          url:
            <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={handleUrlChange}
            />
        </div>
        <button type="submit">create</button>
      </form>  
    </div>
  )
}

export default BlogForm