// Alustetaan perustilaksi tyhjä olio
const initialState = { message: null, type: null }

// määritellään reducerin toiminta
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return state = action.notification
  case 'CLEAR':
    return state = { message: null, type: null }
  default:
    return state
  }
}

// Luodaan ActionCreator, joka automaattisesti poistaa ilmoituksen parametrissä
// annetun ajan (s) kuluttua
export const setNotification = (notification, timeout) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, timeout * 1000)
    dispatch({
      type: 'NOTIFY',
      notification
    })
  }
}

// ActionCreator, joka manuaalisesti tyhjentää ilmoituksen
export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export default reducer
