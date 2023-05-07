import { useState } from 'react'
import DeleteButton from './Button'

const Blog = ({ user, blog, addLike, deletePost }) => {
  const [visibility, setVisibility] = useState(false)

  const handleClick = async (event) => {
    event.preventDefault()
    setVisibility(!visibility)
  }

  const handleLiking = async (event) => {
    event.preventDefault()
    var likedPost = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
      user: blog.user.id
    }

    addLike(likedPost)
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    deletePost(blog.id, blog.title)
  }

  //all blog info is visible
  if (visibility) {
    return(
      <div className="blogStyle">
        <ul>
          <li>{blog.title} <button onClick={handleClick}>hide</button></li>
          <li>author: {blog.author}</li>
          <li>url: {blog.url}</li>
          <li>likes: {blog.likes} <button onClick={handleLiking}>like</button></li>
        </ul>
        <DeleteButton user={user} blog={blog} handleRemove={handleRemove}/>
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
