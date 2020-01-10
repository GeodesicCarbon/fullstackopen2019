import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  const user = props.users.find(user => user.id === props.id)
  return(
    <div>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    login: state.login,
    id: ownProps.id
  }
}
export default connect(
  mapStateToProps,
)(User)
