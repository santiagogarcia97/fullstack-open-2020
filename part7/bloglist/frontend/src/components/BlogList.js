import Togglable from './Togglable'
import BlogForm from './BlogForm'
import React from 'react'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {ListGroup} from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const blogFormRef = React.createRef()
  const handleBlogAdded = async newBlog => {
    try {
      blogFormRef.current.toggleVisibility()
      newBlog.user = { username: user.username }
      await dispatch(addBlog(newBlog))
      dispatch(setNotification(`A new blog "${newBlog.title}" by "${newBlog.author}" was added`, 3))
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  return (
    <div className='text-center'>
      <h2>Blogs List</h2>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm onBlogAdded={handleBlogAdded}/>
      </Togglable>
      <ListGroup >
        {blogs.map(b =>
          <ListGroup.Item key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default BlogList