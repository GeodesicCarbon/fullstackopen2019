import React, { useState } from 'react'

const Books = ({ show, result }) => {
  const [filter, setFilter] = useState()
  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  const bookGenres = [...new Set(result.data.allBooks.flatMap(a => a.genres))]
  const books = filter
    ? result.data.allBooks.filter(book => book.genres.includes(filter))
    : result.data.allBooks

  const inline = {display: 'inline-block'}

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        { bookGenres.map(genre =>
          <button style={inline} key={genre} onClick={() => setFilter(genre)}> {genre}</button>
        )}
        <button style={inline} onClick={() => setFilter()}> all genres</button>
      </div>
    </div>
  )
}

export default Books
