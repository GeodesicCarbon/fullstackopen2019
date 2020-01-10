import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { useLazyQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
 {
   allBooks {
     title
     author {
       name
     }
     genres
     id
     published
   }
 }
`
const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author {name},
      published,
      genres,
      id,
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
      id
      bookCount
    }
  }
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const GET_ME = gql`
 {
   me {
     username
     favoriteGenre
   }
 }
`
const GET_BOOKS = gql`
query Books($genre: String){
  allBooks(genre: $genre) {
    title
    author {
      name
    }
    genres
    id
    published
  }
}
`

const App = () => {
  const client = useApolloClient()
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [getBooks, { loading, data, filter}] = useLazyQuery(GET_BOOKS, { client: client })

  useEffect(() => {
    const storedToken = window.localStorage.getItem('library-user-token')
    if (storedToken) {
      setToken(storedToken)
    }
  },[])



  const handleError = (error) => {
    console.log(error)
    if (error.graphQLErrors[0])
      setErrorMessage(error.graphQLErrors[0].message)
    else
      setErrorMessage(error.toString())
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(GET_ME)

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ALL_AUTHORS },
      { query: GET_BOOKS }
    ]
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  const inline = {display: 'inline-block'}

  return (
    <div>
      {errorMessage &&
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>
      }
      <div>
        <button style={inline} onClick={() => setPage('authors')}>authors</button>
        <button style={inline} onClick={() => setPage('books')}>books</button>
        {!token
          ? <button style={inline} onClick={() => setPage('login')}>log in</button>
          : <div style={inline} >
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommendations</button>
              <button onClick={logout}>log out</button>
            </div>}
      </div>

      <Authors
        show={page === 'authors'}
        result={authors}
        editAuthor={editAuthor}
        token={token}
      />

      <Books
        show={page === 'books'}
        genres={books.data ? [...new Set(books.data.allBooks.flatMap(a => a.genres))] : []}
        getBooks={getBooks}
        loading={loading}
        data={data}
        filter={filter}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />
      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)}
        changePage={(page) => setPage(page)}
      />
      <Recommend
        show={page === 'recommend'}
        user={user}
        client={client}
        genres={books.data ? [...new Set(books.data.allBooks.flatMap(a => a.genres))] : []}
        query={GET_BOOKS}
      />

    </div>
  )
}

export default App
