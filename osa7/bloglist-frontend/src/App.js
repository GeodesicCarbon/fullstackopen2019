import React, { useEffect } from 'react'
import { connect } from 'react-redux'
// Tuodaan tarvittavat komponentit
import BlogList  from './components/BlogList'
import BlogSubmit from './components/BlogSubmit'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
// Tuodaan ActionCreatorit
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'

// Applikaation pääosa
const App = (props) => {
  // Alustetaan tarvittavat tilat
  // haetaan blogit palvelimelta
  useEffect(() => {
    props.initializeBlogs()
  },[])

  // jos käyttäjä on jo kirjautunut, haetaan tiedot selaimen muistista
  useEffect(() => {
    props.initializeUser()
  }, [])

  // viite blogin lisäyslomakkeeseen
  const blogFormRef = React.createRef()

  // jos käyttäjä ei ole kirjautunut sisään näytetään vain kirjautumislomake
  if (props.user === null){
    return (
      <div>
        <Notification />
        <h1>Blogs</h1>
        <Login />
      </div>
    )
  }

  return (
    <div>
      <Notification/>
      <h1>Blogs</h1>
      <Logout />
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogSubmit />
      </Togglable>
      <hr/>
      <BlogList/>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notification:  state.notification,
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  initializeUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
