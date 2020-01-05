// tuodaan tarvittavat palvelut
import blogService from '../services/blogs'

// määritellään reducerin toiminta
const blogReducer = (state = [], action) => {
  switch (action.type) {
  // uuden blogilistauksen lisääminen
  case 'NEW_BLOG':
    return [...state, action.data]
  // blogilistauksen äänen muutos
  case 'VOTE':{
    const id = action.data.blog.id
    const blogToChange = state.find(blog => blog.id === id)
    const changedBlog = { ...blogToChange, votes: action.data.blogs.votes }
    return state.map(
      blog => blog.id !== id ? blog : changedBlog
    )
  }
  // blogilistauksen ensimmäinen populointi
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

// blogilistausten hakeminen tietokannalta
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

// blogilistauksen äänestäminen
export const voteBLog = (blog) => {
  return async dispatch => {
    const blogUpdate = await blogService(
      blog.id,
      { ...blog,
        votes: blog.votes + 1
      }
    )
    dispatch({
      type: 'VOTE',
      data: { blog: blogUpdate }
    })
  }
}

// uuden blogilistauksen lisääminen tietokantaan
export const createBlog = (data) => {
  return async dispatch => {
    const blog = await blogService.createNew(data)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export default blogReducer
