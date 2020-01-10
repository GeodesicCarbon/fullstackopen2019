import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Icon, Input, Button } from 'antd'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    const user = {
      username: username,
      password: password
    }
    setUsername('')
    setPassword('')
    // event.target.username.value = ''
    // event.target.password.value = ''
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
    <Form onSubmit={handleLogin} className="login-form">
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="login-form-button">
        Log in
      </Button>
    </Form>
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
