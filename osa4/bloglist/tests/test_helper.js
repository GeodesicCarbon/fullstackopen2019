const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'React patterns 2',
    author: 'Michael Chan',
    url: 'https://reactpatterns2.com/',
    likes: 5,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

const newBlog = {
  title: 'Canonical string reduction 2.0',
  author: 'Edsger W. Dijkstra',
  url: 'http://www2.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 4,
}

const nonExistingId = async () => {
  const blog = new Blog({ title: 'placeholder' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, newBlog
}
