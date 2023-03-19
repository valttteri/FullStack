import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(null) 
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
 
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setErrorMessage(`${user.username} logged in`) 
      setErrorType('positive')
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Invalid username or password')
      setErrorType('negative')
    }
  setTimeout(() => {
    setErrorMessage(null)
    setErrorType(null)
  }, 4000)
}

  const handleLogout = async (event) => {
    event.preventDefault()
    setErrorMessage(`${user.username} logged out`)
    setErrorType('positive')
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    setTimeout(() => {
      setErrorMessage(null)
      setErrorType(null)
    }, 4000)
  }

  //add a new post
  const addPost = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    //check if input is valid
    if (newAuthor === '' || newTitle === '') {
      setErrorMessage('Invalid input')
      setErrorType('negative')
    } else {
      blogService.createPost(blogObject)
      setErrorMessage(`created a new blog "${blogObject.title}" by author ${blogObject.author} added`)
      setErrorType('positive')
    }

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')

    setTimeout(() => {
      setErrorMessage(null)
      setErrorType(null)
    }, 4000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} type={errorType}/>
        <form onSubmit={handleLogin}>
        <div>
          username:  
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} type={errorType}/>
      <p>{user.username} logged in <button onClick={handleLogout}>log out</button></p>
      <h3>create a new post</h3>
      <form onSubmit={addPost}>
      <div>
        title:
          <input
          type="text"
          value={newTitle}
          name="Title"
          onChange={({ target }) => setNewTitle(target.value)}
          />
      </div>
      <div>
        author:
          <input
          type="text"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
          />
      </div>
      <div>
        url:
          <input
          type="text"
          value={newUrl}
          name="Url"
          onChange={({ target }) => setNewUrl(target.value)}
          />
      </div>
      <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App