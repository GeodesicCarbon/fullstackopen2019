// tuodaan tarvittavat palvelut
import loginService from '../services/login'

// määritellään reducerin toiminta
const userReducer = (state = {}, action) => {
  switch (action.type) {
  // kirjaudutaan sisään
  case 'LOGIN':
    return action.data
  // kirjaudutaan ulos
  case 'LOGOUT':
    return {}
  // ladataan lokaalisesti tallennettu käyttäjä
  case 'INIT_USER':
    return action.data
  default:
    return state
  }
}

export default userReducer
