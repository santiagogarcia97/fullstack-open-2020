import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

const blog = {
  title: 'Test title',
  author: 'Test author',
  url: 'Test url',
  likes: 10,
  user: {username: 'Test username'}
}

const user = {
  username: 'Test username'
}

describe('testing Blog component', () => {
  test('renders basic content', () => {

    const component = render(
      <Blog blog={blog}></Blog>
    )
    expect(component.container).toHaveTextContent('Test title')
    expect(component.container).toHaveTextContent('Test author')
  })
  test('renders extra content when button clicked', () => {

    const component = render(
      <Blog blog={blog} user={user}></Blog>
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('Test url')
    expect(component.container).toHaveTextContent('10')
  })
  test('like button clicked twice', () => {
    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} user={user} updateLikes={mockHandler}></Blog>
    )
    component.debug()
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(component.container).toHaveTextContent('Test url')
    expect(component.container).toHaveTextContent('10')
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})