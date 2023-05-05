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
      blogService.setToken(user.token)
    }
  }, [])
 
  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
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
  const addPost = async (newTitle, newAuthor, newUrl) => {

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

      //After adding a new blog, fetch all blogs with getAll before updating the blog list with setBlogs. This way the problem in exercise 8 can be avoided
      await blogService.createPost(blogObject)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)

      blogFormRef.current.toggleVisibility()

      setErrorMessage(`created a new blog "${blogObject.title}" by author ${blogObject.author} added`)
      setErrorType('positive')
    }

    setTimeout(() => {
      setErrorMessage(null)
      setErrorType(null)
    }, 4000)
  }

  const deletePost = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      try {
        await blogService.removePost(id)
        const filteredBlogs = blogs.filter(blog => blog.id !== id)
        setBlogs(filteredBlogs)
        setErrorType('positive')
        setErrorMessage(`${name} removed`)
      } catch (error) {
        setErrorType('negative')
        setErrorMessage('Something went wrong')
      }
      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 4000)
    }
  }

  const addLike = async (likedPost) => {
    try {
      await blogService.likePost(likedPost)
      const updatedPosts = await blogService.getAll()
      setBlogs(updatedPosts)
    } catch (error) {
      console.log("cannot like")
    }

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
  //

  return (
    <div>
      <h2>blogs</h2>
      <Notification 
      message={errorMessage} 
      type={errorType}
      />
      <p>{user.username} logged in <button onClick={handleLogout}>log out</button></p>
      <Togglable buttonLabel1='new post' buttonLabel2='cancel' ref={blogFormRef}>
        <BlogForm
        addPost={addPost}
        />
      </Togglable>
      {blogs
        .sort((a, b) => a.likes < b.likes ? 1: -1)
        .map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} deletePost={deletePost}/>
      )}
    </div>
  )
}

export default App