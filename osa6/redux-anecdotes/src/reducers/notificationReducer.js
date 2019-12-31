const initialState = ''

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return state = action.notification
    case 'CLEAR':
      return state = ''
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'NOTIFY',
    notification
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export default reducer
