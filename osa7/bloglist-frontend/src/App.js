import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
// Tuodaan tarvittavat komponentit
import BlogList  from './components/BlogList'
import BlogSubmit from './components/BlogSubmit'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
// Tuodaan ActionCreatorit
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLogin } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'

// Applikaation pääosa
const App = (props) => {
  // Alustetaan tarvittavat tilat
  // haetaan blogit palvelimelta
  useEffect(() => {
    props.initializeBlogs()
  },[])

  // jos käyttäjä on jo kirjautunut, haetaan tiedot selaimen muistista
  useEffect(() => {
    props.initializeLogin()
  }, [])
  // haetaan käyttäjätiedot
  useEffect(() => {
    props.initializeUsers()
  })

  // viite blogin lisäyslomakkeeseen
  const blogFormRef = React.createRef()

  // jos käyttäjä ei ole kirjautunut sisään näytetään vain kirjautumislomake
  if (props.login === null){
    return (
      <div>
        <Notification />
        <h1>Blogs</h1>
        <Login />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <Notification/>
        <h1>Blogs</h1>
        <Logout />
        <Route exact path="/" render={() =>
          <div>
            <Togglable buttonLabel="New Blog" ref={blogFormRef}>
              <BlogSubmit />
            </Togglable>
            <hr/>
            <BlogList/>
          </div>
        }/>
        <Route exact path="/users" render={() => <Users />}/>
        <Route exact path="/users/:id" render={({ match }) =>
          <User id={match.params.id}/>
        }/>
      </div>
    </Router>
  )
}
const mapStateToProps = (state) => {
  return {
    notification:  state.notification,
    login: state.login
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  initializeLogin,
  initializeUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
