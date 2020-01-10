import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
  if (props.users === null)
    return null
  return(
    <div>
      <table>
        <tbody>
          <tr>
            <th/>
            <th>Blogs created</th>
          </tr>
          {props.users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td><td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}
export default connect(
  mapStateToProps,
)(Users)
