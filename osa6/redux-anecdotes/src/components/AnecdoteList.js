import React from 'react'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const filter = store.getState().filter
  const anecdotes = store.getState().anecdotes.filter((a) => {
    if (!filter)
      return true;
    return a.content.includes(filter)
  })


  const vote = (id, content) => {
    store.dispatch(voteAnecdote(id))
    store.dispatch(setNotification(`voted '${content}'`))
    setTimeout(() => {
      store.dispatch(setNotification(''))
    }, 5000)
  }

  return(
    <div>
    {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList
