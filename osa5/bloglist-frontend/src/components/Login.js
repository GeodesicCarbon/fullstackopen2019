import React from 'react'

const LoginForm = ({ loginForm }) => (
  <form onSubmit={loginForm.handleLogin}>
    <div>
      Username:
      <input
        type="text"
        value={loginForm.username}
        name="Username"
        onChange={({ target }) => loginForm.setUsername(target.value)}
      />
    </div>
    <div>
      Password:
      <input
        type="password"
        value={loginForm.password}
        name="Username"
        onChange={({ target }) => loginForm.setPassword(target.value)}
      />
    </div>
    <button type="submit">Login</button>
  </form>
)

const Login = ({ loginForm }) => (
  <div>
    <h2>Login to access the application</h2>
    <LoginForm loginForm={loginForm} />
  </div>
)

export default Login
