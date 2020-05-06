import React, { useState, useEffect } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
      const blog = await blogService.create(newBlog)

      blog.user = { username: user.username }
      setBlogs(blogs.concat(blog))
      dispatch(setNotification(`A new blog "${blog.title}" by "${blog.author}" was added`, 3))
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  const updateLikes = async blog => {
    try {
      blog.likes = blog.likes + 1
      await blogService.update(blog)

      const updatedBlogs = blogs
      updatedBlogs[updatedBlogs.findIndex(b => b.id === blog.id)].likes = blog.likes
      setBlogs(sortBlogs(updatedBlogs))

      dispatch(setNotification(`Likes of blog "${blog.title}" were updated`, 3))
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  const deleteBlog = async blog => {
    try {
      await blogService.remove(blog)

      const updatedBlogs = blogs.filter(b => {
        return b.id !== blog.id
      })
      setBlogs(sortBlogs(updatedBlogs))

      dispatch(setNotification(`"${blog.title}" was removed succesfully`, 3))
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  const sortBlogs = (unsortedList) => {
    const sortedList = unsortedList
    sortedList.sort((a, b) => {return b.likes - a.likes})
    return sortedList
  }

  useEffect(() => {
    blogService.getAll().then( b => {
      setBlogs(sortBlogs(b))
    })
  }, [])

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
            deleteBlog={deleteBlog} updateLikes={updateLikes} user={user}/>
        </>
      }
    </div>
  )
}

export default App