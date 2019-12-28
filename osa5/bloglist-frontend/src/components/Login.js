import React from 'react'

const LoginForm = ({ username, password, handleLogin }) => (
  <form onSubmit={handleLogin} className="loginForm">
    <div>
      Username:
      <input {...username}/>
    </div>
    <div>
      Password:
      <input {...password}/>
    </div>
    <button type="submit">Login</button>
  </form>
)

const Login = (props) => (
  <div>
    <h2>Login to access the application</h2>
    <LoginForm {...props} />
  </div>
)

export default Login
