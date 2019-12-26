import React, { useState, useEffect } from 'react'
// Tuodaan tarvittavat komponentit
import Blog from './components/Blog'
import BlogSubmit from "./components/BlogSubmit"
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
// Tuodaan tarvittavat palvelut
import blogService from './services/blogs'
import loginService from './services/login'

// Applikaation pääosa
const App = () => {
  // Alustetaan tarvittavat tilat
  // - näytettävät blogit
  const [blogs, setBlogs] = useState([])
  // - viestit ja virheilmoitukset
  const [notification, setNotification] = useState({message: null, type: null})
  // - kirjautuminen
  const [username,  setUsername] =  useState('')
  const [password,  setPassword] =  useState('')
  const [user,      setUser] =      useState(null)
  // - uuden blogin lisääminen
  const [blogtitle,   setBlogtitle] =   useState('')
  const [blogauthor,  setBlogauthor] =  useState('')
  const [blogurl,     setBlogurl] =     useState('')

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
      notify('Logged in succesfully', 'success')
      setUser(user)
      setUsername('')
      setPassword('')
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

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title:  blogtitle,
        author: blogauthor,
        url:    blogurl,
        likes:  0,
      }

      const res = await blogService.create(blogObject)
      setBlogs(blogs.concat(res))
      setBlogurl('')
      setBlogtitle('')
      setBlogauthor('')
      notify('Added "' + blogObject.title + '" by ' + blogObject.author, 'success')
    } catch (e) {
      if (e.response)
        notify('Unable to submit a note: ' + e.response.data.error, 'error')
      else
        notify('Unable to submit a note: ' + e, 'error')
    }
  }

  // Funktio, joka luo ilmoituksen sekä sen palautuksen
  // 5s kuluttua
  const notify = (message, type) => {
    setNotification({
      message: message,
      type: type
    })
    setTimeout(() => {
      setNotification({
        message: null,
        type: null
      })
    }, 5000)
  }

  // kirjautumislomake
  const loginForm = {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin
  }

  // Blogin lisäämislomake
  const blogForm = {
    blogtitle,
    setBlogtitle,
    blogauthor,
    setBlogauthor,
    blogurl,
    setBlogurl,
    handleNewBlog
  }
  // jos käyttäjä ei ole kirjautunut sisään näytetään vain kirjautumislomake
  if (user === null){
    return (
      <div>
        <Notification notification={notification} />
        <h1>Blogs</h1>
        <Login loginForm={loginForm} />
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <h1>Blogs</h1>
      <Logout user={user} handleLogout={handleLogout} />
      <BlogSubmit blogForm={blogForm} />
      <hr/>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App;
