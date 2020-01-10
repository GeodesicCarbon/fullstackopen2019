import React, { useState } from 'react'
import { connect } from 'react-redux'

import { voteBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
  const [expanded, setExpanded] = useState(false)

  const blog = props.blog

  const notify = (message, type) => {
    props.setNotification({
      message: message,
      type: type
    }, 5)
  }

  const handleLiking = async () => {
    try {
      await props.voteBlog(blog)
      notify(`Submitted a like: ${blog.title}`, 'success')
    } catch (e) {
      if (e.response)
        notify('Unable to submit a note: ' + e.response.data.error, 'error')
      else
        notify('Unable to submit a note: ' + e, 'error')
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete '${blog.title}' by ${blog.author}`)) {
      try {
        await props.deleteBlog(id)
        notify('Blog deleted succesfully', 'success')
      } catch (e) {
        if (e.response)
          notify('Unable to delete a note: ' + e.response.data.error, 'error')
        else
          notify('Unable to delete a note: ' + e, 'error')
      }
    }
  }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  if(!blog.user || !blog.user.name)
    blog.user = { name: 'Uknown' }

  const deleteButton = () => {
    if (blog.user.username === props.user.username)
      return (
        <div>
          <button onClick={() => handleDelete(blog.id)}>Remove blog from note</button>
        </div>
      )}

  return (
    <div className="blog">
      <div className="titleAuthor" onClick={() => toggleExpanded()}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenExpanded} className="expandedContent">
        <div className="blogURL">
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div className="blogLikes">
          {blog.likes} likes <button onClick={() => handleLiking(blog.id)}>Like</button>
        </div>
        <div className="addAuthor">
          Added by {blog.user.name}
        </div>
        {deleteButton()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user
  }
}
const mapDispatchToProps = {
  voteBlog,
  deleteBlog,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
