// tuodaan tarvittavat palvelut
import blogService from '../services/blogs'

// määritellään reducerin toiminta
const blogReducer = (state = [], action) => {
  switch (action.type) {
  // uuden blogilistauksen lisääminen
  case 'NEW_BLOG':
    return [...state, action.data]
  // blogilistauksen äänen muutos
  case 'VOTE': {
    const id = action.data.blog.id
    const blogToChange = state.find(blog => blog.id === id)
    const changedBlog = { ...blogToChange, likes: action.data.blog.likes }
    return state.map(
      blog => blog.id !== id ? blog : changedBlog
    )
  }
  // poista blogilistaus
  case 'DELETE_BLOG': {
    const id = action.data.blog.id
    return state.filter(
      blog => blog.id !== id
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
export const voteBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = {
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id
    }
    const blogUpdate = await blogService.update(blog.id, updatedBlog)
    dispatch({
      type: 'VOTE',
      data: { blog: blogUpdate }
    })
  }
}

// uuden blogilistauksen lisääminen tietokantaan
export const createBlog = (data) => {
  return async dispatch => {
    const blog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

// blogilistauksen poistaminen
export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: { blog: { id: id } }
    })
  }
}

export default blogReducer
