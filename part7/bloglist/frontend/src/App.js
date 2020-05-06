import React, { useState, useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { setNotification } from './reducers/notificationReducer'
import {addBlog, initBlogs, likeBlog, deleteBlog} from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken('')
  }

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

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return(
    <div>
      <h1>Blogs</h1>
      <Notification/>
      { !user
        ? <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}/>
        : <>
          <p>
            <strong>{user.name}</strong> logged in
            <button onClick={handleLogout}>Logout</button>
          </p>
          <BlogList blogFormRef={blogFormRef} handleBlogAdded={handleBlogAdded} blogs={blogs}
            deleteBlog={handleDeleteBlog} updateLikes={updateLikes} user={user}/>
        </>
      }
    </div>
  )
}

export default App