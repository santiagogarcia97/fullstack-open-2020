import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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
    component.debug()

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('Test url')
    expect(component.container).toHaveTextContent('10')
  })
})