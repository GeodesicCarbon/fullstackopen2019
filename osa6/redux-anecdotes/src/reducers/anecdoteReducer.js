// tuodaan tarvittavat palvelut
import anecdoteService from '../services/anecdotes'

// reducerin logiikka
const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    // uuden anekdootin lisääminen listalle
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    // anekdootin äänten muutos
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(
        anecdote => anecdote.id !== id ? anecdote : changedAnecdote
      )
    // anekdoottilistan populointi
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

// anekdoottilistan hakeminen tietokannalta
export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

// uuden anekdootin lisääminen tietokantaan
export const createAnecdote = (data) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export default reducer
