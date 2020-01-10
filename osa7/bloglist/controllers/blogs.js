// ladataan tarvittavat moduulit
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
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
    // const users = await User.find({}) // tehtävää 4.17 varten käytetään ensimmäistä käyttäjää blogien omistajaksi
    // const user = users[0]

    // Tarkistetaan token ja haetaan vastaava käyttäjä
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

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
    const updatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
    response.status(201).json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})
// lisätään blogille kommentti
blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body

  try {
    const blog = await Blog.findById(request.params.id)
    const comment = body.comment
    blog.comments = blog.comments.concat(comment)
    const savedBlog = await blog.save()

    const updatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
    response.status(201).json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

// Poistetaan blogi
blogsRouter.delete('/:id', async (request, response, next) => {
  const blogId = request.params.id
  try {
    // haetaan poistopyynnön tekijä
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(blogId)
    // tarkistetaan, että poistaja on blogin omistaja
    if (blog.user.toString() === decodedToken.id) {
      await Blog.findByIdAndRemove(blogId)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'user cannot delete this blog' })
    }
  } catch (exception) {
    next(exception)
  }
})

// Päivitetään blogin tiedot
blogsRouter.put('/:id', async (request, response, next) => {
  const blog = request.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true, runValidators: true }).populate('user', { username: 1, name: 1 })
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
