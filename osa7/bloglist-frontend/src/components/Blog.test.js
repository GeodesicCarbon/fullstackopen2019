import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const mockLike = jest.fn()

  const testBlog = {
    title: 'This is a tesblog',
    author: 'Jest',
    url: 'https://www.testblog.com/blogatog',
    likes: '42'
  }
  testBlog.user = { name: 'Foo Bar' }
  beforeEach(() => {
    component = render(
      <Blog blog={testBlog} username="" handleLiking={mockLike} handleDelete={() => {}} />
    )
  })

  test('renders blog title', () => {
    const div = component.container.querySelector('.titleAuthor')
    expect(div).toHaveTextContent(testBlog.title)
  })

  test('renders blog author', () => {
    const div = component.container.querySelector('.titleAuthor')
    expect(div).toHaveTextContent(testBlog.author)
  })

  test('hides expanded content by default', () => {
    const div = component.container.querySelector('.expandedContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the title the rest is displayed', () => {
    const title =  component.container.querySelector('.titleAuthor')
    fireEvent.click(title)

    const div = component.container.querySelector('.expandedContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the title hides the expanded content again', () => {
    const title =  component.container.querySelector('.titleAuthor')
    fireEvent.click(title)
    fireEvent.click(title)

    const div = component.container.querySelector('.expandedContent')
    expect(div).toHaveStyle('display: none')
  })

  test('expanded blog has url', () => {
    const div = component.container.querySelector('.blogURL')
    expect(div).toHaveTextContent(testBlog.url)
  })

  test('expanded blog has correct likes', () => {
    const div = component.container.querySelector('.blogLikes')
    expect(div).toHaveTextContent(`${testBlog.likes} likes`)
  })

  test('expanded blog has adding author', () => {
    const div = component.container.querySelector('.addAuthor')
    expect(div).toHaveTextContent(`Added by ${testBlog.user.name}`)
  })

  test('clicking like button fires event', () => {
    const btn = component.getByText('Like')
    fireEvent.click(btn)

    expect(mockLike.mock.calls.length).toBe(1)
  })
})
