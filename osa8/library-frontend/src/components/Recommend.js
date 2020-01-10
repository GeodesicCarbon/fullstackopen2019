import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'

const Recommend = ({ show, user, client, genres, query }) => {
  const [getBooks, { loading, data }] = useLazyQuery(query, { client: client, fetchPolicy: 'no-cache' })
  useEffect(() => {
    if(user.data)
     getBooks({ variables: { genre: user.data.me.favoriteGenre }})
  }, [user.data])
  if (!show) {
    return null
  }
  if (loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>books</h2>
      <div>books in your favourite genre <b>{user.data.me.favoriteGenre}</b></div>
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
          {data.allBooks.map(a =>
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
