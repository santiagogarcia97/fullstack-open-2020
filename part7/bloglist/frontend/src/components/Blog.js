import React from 'react'
import {commentBlog, deleteBlog, likeBlog} from '../reducers/blogReducer'
import {setNotification} from '../reducers/notificationReducer'
import {useDispatch, useSelector} from 'react-redux'
import {useRouteMatch, useHistory} from 'react-router-dom'
import {useField} from '../hooks'
import {Button, Card, Form} from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const newComment = useField('text')
  const user = useSelector(({ user }) => user)
  const match = useRouteMatch('/blogs/:id')
  const blog = useSelector(
    ({ blogs }) => blogs.find(b => b.id === match.params.id))

  const handleUpdateLikes = async () => {
    try {
      await dispatch(likeBlog(blog))
      dispatch(setNotification(`Likes of blog "${blog.title}" were updated`, 5))
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  const handleDeleteBlog = async () => {
    try {
      if(window.confirm(`Remove blog "${blog.title}"?`)) {
        await dispatch(deleteBlog(blog))
        history.push('')
        dispatch(setNotification(`"${blog.title}" was removed successfully`, 5))
      }
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  const handleNewComment = async () => {
    try{
      await dispatch((commentBlog(blog.id, newComment.input.value)))
      dispatch(setNotification(`The comment for blog "${blog.title}" was added successfully`, 5))
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  if(!blog) return null
  return (
    <Card className='text-center'>
      <Card.Header>{blog.author}</Card.Header>
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>
          <a href={blog.url}>{blog.url}</a>
          <br/>
          <strong>{blog.likes}</strong> likes!
        </Card.Text>
        <Button variant='primary' onClick={handleUpdateLikes}>Like this blog!</Button>
        {blog.user.username === user.username
          ? <p className='m-2'><Button variant='danger' onClick={handleDeleteBlog}>Delete</Button></p>
          : null
        }
      </Card.Body>

      <Card.Footer>
        <h5>Comments</h5>
        {blog.comments.length !== 0
          ? blog.comments.map((comment, i) => <p key={i}>{comment}</p>)
          : <p className='text-muted'>There are no comments for this blog</p>
        }
        <>
          <Form.Group>
            <Form.Control {...newComment.input} />
            <Button onClick={handleNewComment} className='my-2'>Add comment</Button>
          </Form.Group>
        </>
      </Card.Footer>
    </Card>
  )
}

export default Blog
