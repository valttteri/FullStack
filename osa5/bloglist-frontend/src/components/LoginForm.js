import Notification from './Notification'

const LoginForm = ({
  errorMessage,
  errorType,
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {
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
            onChange={handleUsernameChange}
          />
        </div>
        <div>
        password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm