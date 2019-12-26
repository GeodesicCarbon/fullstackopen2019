import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  if(!blog.user || !blog.user.name)
    blog.user = {name: 'Uknown'}

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
          {blog.likes} likes <button>Like</button>
        </div>
        <div>
          Added by {blog.user.name}
        </div>
      </div>
    </div>
  )
}

export default Blog
