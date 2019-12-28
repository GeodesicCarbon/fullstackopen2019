import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('renders the login screen for new user', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    // odota että elementit on rendattu
    await waitForElement(
      () => component.container.querySelector('.loginForm')
    )

    expect(component.container).toHaveTextContent('Username:')
    expect(component.container).toHaveTextContent('Password:')

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })
  test('renders the blogs for the user logged in', async () => {
    // tehdään mock-käyttäjä jo kirjautuneena sisään
    const user = {
      username: 'testuser',
      token: 'qwertyuiopasdfghjklö',
      name: 'Test User Please Ignore'
    }
    localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)
    // odota että elementit on rendattu
    await waitForElement(
      () => component.container.querySelector('.blog')
    )
    expect(component.container).not.toHaveTextContent('Username:')
    expect(component.container).not.toHaveTextContent('Password:')

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(5)

    // Tarkistetaan että kaikki esimerkkiblogin on rendattu
    expect(component.container).toHaveTextContent(
      'aaa'
    )
    expect(component.container).toHaveTextContent(
      'Gödel, Escher, Bach: an Eternal Golden Braid'
    )
    expect(component.container).toHaveTextContent(
      '5.3 test 2'
    )
    expect(component.container).toHaveTextContent(
      'part II: Electric Boogaloo'
    )
    expect(component.container).toHaveTextContent(
      '5.9 test one'
    )
  })
})
