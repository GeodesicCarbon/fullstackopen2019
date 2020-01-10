import React, { useEffect } from 'react'


const Books = ({ show, genres, getBooks, loading, data, filter }) => {
  useEffect(() => {
    getBooks()
  }, [])
  if (!show) {
    return null
  }
  if ( loading ) {
    return <div>loading...</div>
  }
  const books = data ? data.allBooks : []
  const inline = {display: 'inline-block'}

  return (
    <div>
      <h2>books</h2>
      {filter ? <div> in genre {filter}</div> : null }
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
        { genres.map(genre =>
          <button style={inline} key={genre} onClick={() => getBooks({ variables: { genre: genre }})}> {genre}</button>
        )}
        <button style={inline} onClick={() => getBooks()}> all genres</button>
      </div>
    </div>
  )
}

export default Books
