// tuodaan tarvittavat moduulit
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// tuodaan tarvittavat reducerit
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

// 
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
