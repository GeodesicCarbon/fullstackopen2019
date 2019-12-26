import React from 'react'

const Logout = ({ user, handleLogout }) => (
  <div>
  <p> Logged in as {user.name} <button onClick={() => handleLogout()}>Logout</button></p>
  </div>
)

export default Logout
