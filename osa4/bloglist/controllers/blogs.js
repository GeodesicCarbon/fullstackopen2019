// ladataan tarvittavat moduulit
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
// ladataan blogien MongoDB-skeema
const Blog = require('../models/blog')
const User = require('../models/user')
// Ladataan virheidenhallinnan middleware

// Eristetään pyynnön token käyttäjien hallintaan
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

// --- Määritellään reitit ---
// Palautetaan tallennetut blogit
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// Lisätään uusi blogi listalle
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)
  try {
    // const user = await User.findById(body.userId)
    // const users = await User.find({}) // tehtävää 4.17 varten käytetään ensimmäistä käyttäjää blogien omistajaksi
    // const user = users[0]
    // Tarkistetaan token ja haetaan vastaava käyttäjä
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
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
