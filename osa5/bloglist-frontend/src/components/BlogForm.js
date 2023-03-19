const BlogForm = ({
   addPost,
   newTitle,
   newAuthor,
   newUrl,
   handleTitleChange,
   handleAuthorChange,
   handleUrlChange 
  }) => {
  return (
    <div>
      <h3>create a new post</h3>
      <form onSubmit={addPost}>
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