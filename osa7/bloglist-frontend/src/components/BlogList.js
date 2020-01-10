import React from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'

const BlogList = (props) => {
  return (
    <div>
      {props.blogs.map(blog =>
        <div key={blog.id}>
          <Blog blog={blog} username={props.username}/>
        </div>
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort((a, b) => b.likes - a.likes)
  }
}

export default connect(
  mapStateToProps
)(BlogList)
