import React from 'react'
import {
  Link
} from 'react-router-dom'
import { connect } from 'react-redux'

const BlogList = (props) => {
  return (
    <div>
      {props.blogs.map(blog =>
        <div className='blog' key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
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
