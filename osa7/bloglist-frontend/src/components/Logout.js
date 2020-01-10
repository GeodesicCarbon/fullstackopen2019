import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
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
      <p> Logged in as {} <button onClick={handleLogout}>Logout</button></p>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user
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
