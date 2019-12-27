import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, handleLiking, handleDelete }) => {
  const [expanded, setExpanded] = useState(false)

  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  if(!blog.user || !blog.user.name)
    blog.user = { name: 'Uknown' }

  const deleteButton = () => {
    if (blog.user.username === username)
      return (
        <div>
          <button onClick={() => handleDelete(blog.id)}>Remove blog from note</button>
        </div>
      )}

  return (
    <div className="blog">
      <div onClick={() => toggleExpanded()}>
        {blog.title} {blog.author}
      </div>
      <div style ={showWhenExpanded}>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button onClick={() => handleLiking(blog.id)}>Like</button>
        </div>
        <div>
          Added by {blog.user.name}
        </div>
        {deleteButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  handleLiking: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog
