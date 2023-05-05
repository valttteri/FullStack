import { useState, useRef } from "react"
import Togglable from "./Togglable"


const Blog = ({ blog }) => {
  const [visibility, setVisibility] = useState(false)

  const handleClick = async (event) => {
    event.preventDefault()
    setVisibility(!visibility)
  }

  //all blog info is visible
  if (visibility) {
    return(
      <div className="blogStyle"> 
        <ul>
          <li>{blog.title} <button onClick={handleClick}>hide</button></li>
          <li>author: {blog.author}</li>
          <li>url: {blog.url}</li>
          <li>likes: {blog.likes}</li>
        </ul>
      </div> 
    )
  }

  //only the title is visible
  return (
    <div className="blogStyle">
      <p>{blog.title} <button onClick={handleClick}>show</button></p>
    </div>
  )
}

export default Blog

/*

const blogFormRef = useRef()
  const listStyle = { "listStyleType": 'none'}
  console.log(blog)
  
  return(
    <div>
      {blog.title} 
      <Togglable buttonLabel1='show' buttonLabel2='hide' ref={blogFormRef}>
      <ul style={listStyle}>
        <li>{blog.author}</li>
        <li>{blog.url}</li>
        <li>{blog.likes}</li>
      </ul>
      </Togglable>
    </div> 
  )

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
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

*/