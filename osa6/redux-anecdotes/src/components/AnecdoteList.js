import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (id, content) => {
    props.voteAnecdote(id)
    props.setNotification(`voted '${content}'`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)
  }
  return(
    <div>
    {props.anecdotes.map(anecdote =>
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

const anecdotesToShow = ({ anecdotes, filter}) => {
  console.log(anecdotes)
  if (!filter)
    return anecdotes.sort((a, b) => b.votes - a.votes)
  return anecdotes
    .filter(a => a.content.includes(filter))
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
    anecdotes: anecdotesToShow(state),
    notification: state.notification
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
