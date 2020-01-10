import React from 'react'

const Recommend = ({ show, result, user }) => {
  if (!show) {
    return null
  }
  if (result.loading || user.loading) {
    return <div>loading...</div>
  }
  const fav = user.data.me.favoriteGenre
  return (
    <div>
      <h2>books</h2>
      <div>books in your favourite genre <b>{fav}</b></div>
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
          {result.data.allBooks.filter(book => book.genres.includes(fav)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
