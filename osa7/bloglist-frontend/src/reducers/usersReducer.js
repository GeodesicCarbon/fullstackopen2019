// tuodaan tarvittavat palvelut
import usersService from '../services/users'

// määritellään reducerin toiminta
const usersReducer = (state = [], action) => {
  switch (action.type) {
  // käyttäjien ensimmäinen populointi
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }
}

// blogilistausten hakeminen tietokannalta
export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default usersReducer
