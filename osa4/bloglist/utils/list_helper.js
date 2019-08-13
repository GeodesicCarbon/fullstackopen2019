var _ = require('lodash')

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

const mostBlogs = (blogs) => {
  // Yhden rivin ihme, jolla ryhmitetään tekijät blogien määrän perusteella, avataan
  // objekti {key:value} arrayksi [key, value] järjestetään suuruusjärjestykseen
  // blogien määrän mukaan, valitaan ensimmäinen ja zipataan se haluttujen avaimien
  // kanssa uudeksi objektiksi.

  // Scala-kurssi muuttaa ihmistä

  const keys = ['author', 'blogs']
  return blogs.length === 0
    ? null
    : _(keys).zipObject(_(blogs).countBy(blog => blog.author).toPairs().orderBy(blog => blog[1], ['desc']).head()).value()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
