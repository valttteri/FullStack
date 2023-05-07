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
            id='username'
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
        password:
          <input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm