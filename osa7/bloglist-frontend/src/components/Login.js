import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = (props) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    const user = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    event.target.username.value = ''
    event.target.password.value = ''
    try {
      await props.loginUser(user)
      notify('Logged in succesfully', 'success')
    } catch (e) {
      notify('Incorrect username or password', 'error')
    }
  }
  const notify = (message, type) => {
    props.setNotification({
      message: message,
      type: type
    }, 5)
  }
  return(
    <form onSubmit={handleLogin} className="loginForm">
      <div>
        Username:
        <input
          type="text"
          name='username'
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          name='password'
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}
const Login = (props) => (
  <div>
    <h2>Login to access the application</h2>
    <LoginForm {...props} />
  </div>
)
const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}
const mapDispatchToProps = {
  loginUser,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
