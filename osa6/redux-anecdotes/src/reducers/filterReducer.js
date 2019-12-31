const filterReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    case 'RESET_FILTER':
      return null
    default:
      return state
  }
}

export const filterChange = filter => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export const filterReset = () => {
  return {
    type: 'RESET_FILTER'
  }
}

export default filterReducer
