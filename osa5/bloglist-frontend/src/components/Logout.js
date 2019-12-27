import React from 'react'
import PropTypes from 'prop-types'

const Logout = ({ user, handleLogout }) => (
  <div>
    <p> Logged in as {user.name} <button onClick={() => handleLogout()}>Logout</button></p>
  </div>
)

Logout.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired
}

export default Logout
