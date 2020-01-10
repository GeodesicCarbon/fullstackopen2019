import React from 'react'
import { connect } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogField = ({ field, fieldName }) => (
  <div>
    {field}
    <input
      type="text"
      name={fieldName}
    />
  </div>
)

const BlogSubmit = (props) => {
  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.blogTitle.value,
      author: event.target.blogAuthor.value,
      url: event.target.blogURL.value,
      likes: 0,
    }
    event.target.blogTitle.value = ''
    event.target.blogAuthor.value = ''
    event.target.blogURL.value = ''

    try {
      props.createBlog(newBlog)
      const notification = {
        message: 'Added "' + newBlog.title + '" by ' + newBlog.author,
        type: 'success'
      }
      props.setNotification(notification, 5)
    } catch (e) {
      if (e.response)
        props.setNotification(
          { message:'Unable to submit a note: ' + e.response.data.error,
            type: 'error' },
          5
        )
      else
        props.setNotification(
          { message: 'Unable to submit a note: ' + e,
            type: 'error' },
          5
        )
    }
  }
  return (
    <div>
      <h2>Submit a blog</h2>
      <form onSubmit={addBlog}>
        <BlogField
          field="Title of the blog: "
          fieldName="blogTitle"
        />
        <BlogField
          field="Author of the blog: "
          fieldName="blogAuthor"
        />
        <BlogField
          field="Blog URL: "
          fieldName="blogURL"
        />
        <button type="submit">Submit blog</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}
const mapDispatchToProps = {
  createBlog,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogSubmit)
