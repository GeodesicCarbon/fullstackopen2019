// tuodaan tarvittavat palvelut
import loginService from '../services/login'
import blogService from '../services/blogs'

// määritellään reducerin toiminta
const userReducer = (state = null, action) => {
  switch (action.type) {
  // kirjaudutaan sisään
  case 'LOGIN':
    return action.data
  // kirjaudutaan ulos
  case 'LOGOUT':
    return null
  // ladataan lokaalisesti tallennettu käyttäjä
  case 'INIT_USER':
    return action.data
  default:
    return state
  }
}
// käyttäjän hakeminen lokaalisesti
export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        data: user
      })
    }
  }
}
// käyttäjän kirjautuminen sisään
export const loginUser = (user) => {
  return async dispatch => {
    try {
      const newUser = await loginService.login(user)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(newUser)
      )
      blogService.setToken(newUser.token)
      dispatch({
        type: 'LOGIN',
        data: newUser
      })
    } catch (e) {
      console.log(e)
    }
  }
}
// käyttäjän kirjautuminen ulos
export const logoutUser = () => {
  return dispatch => {
    blogService.setToken('')
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}


export default userReducer
