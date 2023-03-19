import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
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

  //render initial posts
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  //fetch logged user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
 
  const blogFormRef = useRef()

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
      blogFormRef.current.toggleVisibility()
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
    return(
    <div>
      <LoginForm
      errorMessage={errorMessage}
      errorType={errorType}
      handleLogin={handleLogin}
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification 
      message={errorMessage} 
      type={errorType}
      />
      <p>{user.username} logged in <button onClick={handleLogout}>log out</button></p>
      <Togglable buttonLabel='new post' ref={blogFormRef}>
        <BlogForm
        addPost={addPost}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        handleTitleChange={({ target }) => setNewTitle(target.value)}
        handleAuthorChange={({ target }) => setNewAuthor(target.value)}
        handleUrlChange={({ target }) => setNewUrl(target.value)}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App