// tuodaan tarvittavat moduulit
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// tuodaan tarvittavat reducerit
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

// yhdistetään reducerit yhdeksi olioksi
const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer
})

// tehdään yhdistetyistä reducereistä store ja laitetaan thunk käyttöön
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
