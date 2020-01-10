import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// Tuodaan tarvittavat komponentit
import BlogList  from './components/BlogList'
import BlogSubmit from './components/BlogSubmit'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
// Tuodaan tarvittavat palvelut
import blogService from './services/blogs'
import loginService from './services/login'
// Tuodaan custom hookit
import { useField } from './hooks'
// Tuodaan ActionCreatorit
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

// Applikaation pääosa
const App = (props) => {
  // Alustetaan tarvittavat tilat
  // - kirjautuminen
  const username        = useField('text')
  const password        = useField('password')
  const [user, setUser] = useState(null)

  // haetaan blogit palvelimelta
  useEffect(() => {
    props.initializeBlogs()
  },[])

  // jos käyttäjä on jo kirjautunut, haetaan tiedot selaimen muistista
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // käyttäjän kirjautumisen vaadittavat toimet
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      // tallennetaan kirjautunut käyttäjä selaimen muistiin
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      notify('Logged in succesfully', 'success')
      setUser(user)
      username.reset()
      password.reset()
    } catch (e) {
      notify('Incorrect username or password', 'error')
    }
  }

  // käyttäjän uloskirjautumiseen vaadittavat toimet
  const handleLogout = async () => {
    setUser(null)
    blogService.setToken('')
    window.localStorage.removeItem('loggedBloglistUser')
    notify('Logged out succesfully', 'success')
  }

  // Funktio, joka luo ilmoituksen
  const notify = (message, type) => {
    props.setNotification({
      message: message,
      type: type
    }, 5)
  }

  // viite blogin lisäyslomakkeeseen
  const blogFormRef = React.createRef()

  // Blogin lisäämislomake

  // jos käyttäjä ei ole kirjautunut sisään näytetään vain kirjautumislomake
  if (user === null){
    return (
      <div>
        <Notification />
        <h1>Blogs</h1>
        <Login username={username.input} password={password.input} handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <Notification/>
      <h1>Blogs</h1>
      <Logout user={user} handleLogout={handleLogout} />
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogSubmit />
      </Togglable>
      <hr/>
      <BlogList username={user.username} />
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notification:  state.notification
  }
}

const mapDispatchToProps = {
  setNotification,
  initializeBlogs
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
