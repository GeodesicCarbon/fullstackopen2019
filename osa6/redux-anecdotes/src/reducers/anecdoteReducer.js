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
      const id = action.data.anecdote.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: action.data.anecdote.votes }
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

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const anecdoteUpdate = await anecdoteService.update( anecdote.id,
      { ...anecdote,
        votes: anecdote.votes + 1
      }
    )
    dispatch({
      type: 'VOTE',
      data: { anecdote: anecdoteUpdate }
    })
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
