import React from 'react'
import {deleteBlog, likeBlog} from '../reducers/blogReducer'
import {setNotification} from '../reducers/notificationReducer'
import {useDispatch, useSelector} from 'react-redux'
import {useRouteMatch, useHistory} from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(({ user }) => user)
  const match = useRouteMatch('/blogs/:id')
  const blog = useSelector(
    ({ blogs }) => blogs.find(b => b.id === match.params.id))

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleUpdateLikes = async () => {
    try {
      await dispatch(likeBlog(blog))
      dispatch(setNotification(`Likes of blog "${blog.title}" were updated`, 3))
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  const handleDeleteBlog = async () => {
    try {
      if(window.confirm(`Remove blog "${blog.title}"?`)) {
        await dispatch(deleteBlog(blog))
        history.push('')
        dispatch(setNotification(`"${blog.title}" was removed succesfully`, 3))
      }
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }
  if(!blog) return null
  return (
    <div style={blogStyle}>
      <p>
        <h3>{blog.title}</h3>
      </p>
      <p>
        {blog.author}
      </p>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        Likes: {blog.likes} <button onClick={handleUpdateLikes}>Like</button>
      </p>
      {blog.user.username === user.username
        ? <p>
          <button onClick={handleDeleteBlog}>Delete</button>
        </p>
        : null
      }
      <h5>Comments</h5>
      {blog.comments.length !== 0
        ? <ul>
          {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
        </ul>
        : <p>There are no comments for this blog</p>
      }
    </div>
  )
}

export default Blog
