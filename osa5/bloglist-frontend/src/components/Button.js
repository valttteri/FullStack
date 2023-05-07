const DeleteButton = ({ user, blog, handleRemove }) => {
  if (user.username === blog.user.username) {
    return(
      <p><button onClick={handleRemove}>delete</button></p>
    )
  }
}

export default DeleteButton