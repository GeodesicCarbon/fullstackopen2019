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
})
