// tuodaan tarvittavat moduulit
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// tuodaan tarvittavat komponentit
import App from './App'

// tuodaan redux-store käsittely
import store from './store'

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

render()
