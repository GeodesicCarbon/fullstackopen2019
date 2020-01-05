import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component
  // nappien painamisen testaus
  const mockHandler = jest.fn()
  // esimerkkiblogi
  const testBlog = {
    title: 'This is a tesblog',
    author: 'Jest',
    likes: '42'
  }

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={testBlog} onClick={mockHandler}/>
    )
  })

  test('renders div with title and author', () => {
    component.container.querySelector('.titleAuthor')
  })

  test('contains blog title', () => {
    const div = component.container.querySelector('.titleAuthor')
    expect(div).toHaveTextContent(testBlog.title)
  })

  test('contains blog author', () => {
    const div = component.container.querySelector('.titleAuthor')
    expect(div).toHaveTextContent(testBlog.author)
  })

  test('renders div with likes', () => {
    component.container.querySelector('.likes')
  })

  test('contains correct likes', () => {
    const div = component.container.querySelector('.likes')
    expect(div).toHaveTextContent(`blog has ${testBlog.likes} likes`)
  })

  test('clicking the like button twice calls event handler twice', async () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
