import React, { useState, useEffect } from 'react'
// Tuodaan tarvittavat komponentit
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
// Tuodaan tarvittavat palvelut
import blogService from './services/blogs'
import loginService from './services/login'

// Applikaation pääosa
const App = () => {
  // Alustetaan tarvittavat tilat
  // - näytettävät blogit
  const [blogs, setBlogs] = useState([])
  // - viestit ja virheilmoitukset
  const [errorMessage, setErrorMessage] = useState('')
  // - kirjautuminen
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // haetaan blogit palvelimelta
  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getAll()
      setBlogs(initialBlogs)
    }
    fetchBlogs()
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
        username, password
      })

      // tallennetaan kirjautunut käyttäjä selaimen muistiin
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setErrorMessage('Incorrect username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  // käyttäjän uloskirjautumiseen vaadittavat toimet
  const handleLogout = async (event) => {
    setUser(null)
    blogService.setToken('')
    window.localStorage.removeItem('loggedBloglistUser')
  }

  // kirjautumislomake
  const loginForm = {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin
  }

  // jos käyttäjä ei ole kirjautunut sisään näytetään vain kirjautumislomake
  if (user === null){
    return (
      <div>
        <h1>Blogs</h1>
        <Login loginForm={loginForm} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Logout user={user} handleLogout={handleLogout} />
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App;
