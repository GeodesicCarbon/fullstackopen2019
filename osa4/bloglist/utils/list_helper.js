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
  // Yhden rivin ihme, laskee blogien määrä per tekijä, muuttaa objektista
  //{author: count} taulukoksi [author, count], järjestää ne blogien määrän
  // mukaan suuruusjärjestykseen, poimii ensimmäisen ja zippaa ne vaadittujen
  // avainten kanssa objektiksi.

  // Scala-kurssi muuttaa ihmistä

  const keys = ['author', 'blogs']
  return blogs.length === 0
    ? null
    : _(keys)
      .zipObject(
        _(blogs)
          .countBy(blog => blog.author)
          .toPairs()
          .orderBy(blog => blog[1], ['desc'])
          .head())
      .value()
}

const mostLikes = (blogs) => {
  // Yhden rivin ihme, jossa poimitaan blogeista vaan tekijä ja kirjoittaja,
  // ryhmitetään ne kirjoittajan mukaan, ryhmitys taulukoksi [author, likes],
  // josta jälkimmäinen on yhteenlaskettu tykkäysten määrä per kirjoittaja,
  // järjestetään suuruusjärjestykseen, valitaan ensimmäinen ja zipataan yhteen
  // vaadittujen avainten kanssa objektiksi.

  // Funktionaalinen ohjelmointi parhaimmillaan

  const keys = ['author', 'likes']
  return blogs.length === 0
    ? null
    : _(keys)
      .zipObject(
        _(blogs)
          .map(blog => _.pick(blog,['author','likes']))
          .groupBy('author')
          .map( blog => [
            blog[0].author,
            blog.reduce( (a, b) => a + b.likes, 0)
          ])
          .orderBy(author => author[1], ['desc'])
          .head())
      .value()
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
