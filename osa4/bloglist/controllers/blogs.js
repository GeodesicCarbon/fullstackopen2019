// ladataan tarvittavat moduulit
const blogsRouter = require('express').Router()
// ladataan blogien MongoDB-skeema
const Blog = require('../models/blog')
const User = require('../models/user')
// Ladataan virheidenhallinnan middleware

// --- Määritellään reitit ---
// Palautetaan tallennetut blogit
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// Lisätään uusi blogi listalle
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    // const user = await User.findById(body.userId)
    const users = await User.find({}) // tehtävää 4.17 varten käytetään ensimmäistä käyttäjää blogien omistajaksi
    const user = users[0]
    const blog = new Blog({
      title:  body.title,
      author: body.author,
      url:    body.url,
      likes:  body.likes,
      user:   user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

// Poistetaan blogi
blogsRouter.delete('/:id', async (request, response, next) => {
  const blogId = request.params.id
  try {
    await Blog.findByIdAndRemove(blogId)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

// Päivitetään blogin tiedot
blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true, runValidators: true })
    if (updatedBlog) {
      response.json(updatedBlog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
