const dummy = (blogs) => { // eslint-disable-line no-unused-vars
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce( (sum, blog) => { return sum + blog.likes }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((top, blog) => top.likes >= blog.likes ? top : blog, { likes: -1 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
