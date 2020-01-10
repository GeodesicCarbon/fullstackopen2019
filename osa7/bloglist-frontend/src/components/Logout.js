import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const Logout = (props) => {
  const handleLogout = () => {
    props.logoutUser()
    notify('Logged out succesfully', 'success')
  }
  const notify = (message, type) => {
    props.setNotification({
      message: message,
      type: type
    }, 5)
  }
  return(
    <div>
      <p> Logged in as {props.login.username} <button onClick={handleLogout}>Logout</button></p>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}
const mapDispatchToProps = {
  logoutUser,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout)
