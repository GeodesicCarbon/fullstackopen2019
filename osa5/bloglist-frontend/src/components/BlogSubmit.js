import React from 'react'

const BlogField = ({ field, fieldValue, fieldName, fieldTarget }) => (
  <div>
    {field}
    <input
      type="text"
      value={fieldValue}
      name={fieldName}
      onChange={({ target }) => fieldTarget(target.value)}
    />
  </div>
)

const BlogSubmit = ({ blogForm }) => (
  <div>
    <h2>Submit a blog</h2>
    <form onSubmit={blogForm.handleNewBlog}>
    <BlogField
      field="Title of the blog: "
      fieldValue={blogForm.blogtitle}
      fieldName="Blog Title"
      fieldTarget={blogForm.setBlogtitle}
    />
    <BlogField
      field="Author of the blog: "
      fieldValue={blogForm.blogauthor}
      fieldName="Blog Author"
      fieldTarget={blogForm.setBlogauthor}
    />
    <BlogField
      field="Blog URL: "
      fieldValue={blogForm.blogurl}
      fieldName="Blog URL"
      fieldTarget={blogForm.setBlogurl}
    />
    <button type="submit">Submit blog</button>
    </form>
  </div>
)

export default BlogSubmit
