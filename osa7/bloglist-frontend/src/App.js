import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Redirect
} from 'react-router-dom'
import { Col, Row } from 'antd'
// Tuodaan tarvittavat komponentit
import BlogList  from './components/BlogList'
import BlogSubmit from './components/BlogSubmit'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

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
      <Row gutter={[16, 16]}>
        <Col offset={1}>
          <Notification />
          <h1>Blogs</h1>
          <Login />
        </Col>
      </Row>
    )
  }
  const findBlogById = (id) =>
    props.blogs.find(blog => blog.id === id)

  return (
    <Row gutter={[16, 16]}>
      <Col offset={1}>
        <Router>
          <div>
            <Menu />
            <Notification/>
            <h1>Blogs</h1>
            <Route exact path="/" render={() => <Redirect to="/blogs"/>} />
            <Route exact path="/blogs" render={() =>
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
            <Route exact path="/blogs/:id" render={({ match }) =>
              <Blog blog={findBlogById(match.params.id)}/>
            }/>
          </div>
        </Router>
      </Col>
    </Row>
  )
}
const mapStateToProps = (state) => {
  return {
    notification:  state.notification,
    login: state.login,
    blogs: state.blogs
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
