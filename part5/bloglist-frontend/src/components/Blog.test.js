import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Test title',
  author: 'Test author',
  url: 'Test url',
  user: {username: 'Test username'}
}

describe('testing Blog component', () => {
  test('renders basic content', () => {

    const component = render(
      <Blog blog={blog}></Blog>
    )
    component.debug()
    expect(component.container).toHaveTextContent('Test title')
    expect(component.container).toHaveTextContent('Test author')
  })
})