import React from 'react'
import {Button, Form} from 'react-bootstrap'
import { useField } from '../hooks'

const BlogForm = ({ onBlogAdded }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleNewBlogSubmit = event => {
    event.preventDefault()
    onBlogAdded({
      title: title.input.value,
      author: author.input.value,
      url: url.input.value
    })
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <Form onSubmit={handleNewBlogSubmit} className='m-2 text-center'>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control {...title.input} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author</Form.Label>
        <Form.Control {...author.input} />
      </Form.Group>
      <Form.Group>
        <Form.Label>URL</Form.Label>
        <Form.Control {...url.input} />
      </Form.Group>
      <Button variant='success' type="submit">Create</Button>
    </Form>
  )
}

export default BlogForm