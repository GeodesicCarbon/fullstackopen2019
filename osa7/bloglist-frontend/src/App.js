import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// Tuodaan tarvittavat komponentit
import Blog from './components/Blog'
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

// Applikaation pääosa
const App = (props) => {
  // Alustetaan tarvittavat tilat
  // - näytettävät blogit
  const [blogs, setBlogs] = useState([])
  // - kirjautuminen
  const username        = useField('text')
  const password        = useField('password')
  const [user, setUser] = useState(null)
  // - uuden blogin lisääminen
  const [blogtitle,     setBlogtitle]       = useState('')
  const [blogauthor,    setBlogauthor]      = useState('')
  const [blogurl,       setBlogurl]         = useState('')

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

  // Uuden blogin luomisen logiikka
  const handleNewBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const blogObject = {
        title:  blogtitle,
        author: blogauthor,
        url:    blogurl,
        likes:  0,
      }

      const res = await blogService.create(blogObject)
      res.user = {
        username: user.username,
        name: user.name
      }
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
  // Tykkäysten korottamisen logiikka
  const handleLiking = async (id) => {
    const blog = blogs.find(x => x.id === id)
    try {
      const updatedBlog = {
        likes: blog.likes + 1,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: blog.user.id
      }
      const res = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : res))
      notify(`Submitted a like: ${blog.title}`, 'success')
    } catch (e) {
      if (e.response)
        notify('Unable to submit a note: ' + e.response.data.error, 'error')
      else
        notify('Unable to submit a note: ' + e, 'error')
    }
  }

  // Blogien poistaminen listalta
  const handleDelete = async (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Are you sure you want to delete '${blog.title}' by ${blog.author}`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
        notify('Blog deleted succesfully', 'success')
      } catch (e) {
        if (e.response)
          notify('Unable to delete a note: ' + e.response.data.error, 'error')
        else
          notify('Unable to delete a note: ' + e, 'error')
      }
    }
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
        <BlogSubmit blogForm={blogForm} />
      </Togglable>
      <hr/>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          username={user.username}
          blog={blog}
          handleLiking={handleLiking}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notification:  state.notification
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
