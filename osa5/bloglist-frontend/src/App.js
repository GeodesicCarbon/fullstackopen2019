import React, { useState, useEffect } from 'react'
// Tuodaan tarvittavat komponentit
import Blog from './components/Blog'
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

  // käyttäjän kirjautumisen vaadittavat toimet
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

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

  // kirjautumislomake
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          name="Username"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  // jos käyttäjä ei ole kirjautunut sisään näytetään vain kirjautumislomake
  if (user === null){
    return (
      <div>
        <h1>Blogs</h1>
        <h2>Login to access the application</h2>
        {loginForm()}
      </div>
    )
  }
  
  return (
    <div>
      <h1>Blogs</h1>
      <h3>Logged in as {user.name}</h3>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App;
