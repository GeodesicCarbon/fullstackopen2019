// tuodaan tarvittavat moduulit
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

// tuodaan tarvittavat komponentit
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

// tuodaan anekdoottien alustamisen vaativa logiikka
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  // alustetaan anekdoottilista ensimmäisellä rendauskerralla
  useEffect(() => {
    props.initializeAnecdotes()
  }, [])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default connect(
  null,
  { initializeAnecdotes }
)(App)
