// ladataan tarvittavat moduulit
const blogsRouter = require('express').Router()
// ladataan blogien MongoDB-skeema
const Blog = require('../models/blog')

// --- Määritellään reitit ---
// Palautetaan tallennetut blogit
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// Lisätään uusi blogi listalle
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter
