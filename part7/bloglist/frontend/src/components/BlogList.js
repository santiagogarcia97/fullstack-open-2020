import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import React from 'react'
import { addBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

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

  const updateLikes = async blog => {
    try {
      await dispatch(likeBlog(blog))
      dispatch(setNotification(`Likes of blog "${blog.title}" were updated`, 3))
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  const handleDeleteBlog = async blog => {
    try {
      await dispatch(deleteBlog(blog))
      dispatch(setNotification(`"${blog.title}" was removed succesfully`, 3))
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  return (
    <div>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm onBlogAdded={handleBlogAdded}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes}
          deleteBlog={handleDeleteBlog} user={user}/>
      )}
    </div>
  )
}

export default BlogList