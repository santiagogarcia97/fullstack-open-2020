import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('testing BlogForm', () => {
  test('component calls event handler', () => {
    const addBlog = jest.fn()
    const component = render(
      <BlogForm onBlogAdded={addBlog}></BlogForm>
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'TitleTest' }
    })
    fireEvent.change(author, {
      target: { value: 'AuthorTest' }
    })
    fireEvent.change(url, {
      target: { value: 'UrlTest' }
    })

    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('TitleTest')
    expect(addBlog.mock.calls[0][0].author).toBe('AuthorTest')
    expect(addBlog.mock.calls[0][0].url).toBe('UrlTest')
  })
})