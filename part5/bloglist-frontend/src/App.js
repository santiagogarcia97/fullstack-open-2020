import React, { useState, useEffect } from 'react'
import "./App.css";
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
      console.log(ex.message)
      setErrorMessage(ex.response.data.error)
      setTimeout(() => {
        setErrorMessage("")
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
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
      console.log(blog)
      setBlogs(blogs.concat(blog))
      setSuccessMessage(`A new blog "${blog.title}" by "${blog.author}" was added`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (ex) {
      console.log(ex.response)
      setErrorMessage(ex.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const updateLikes = async blog => {
    try {
      blog.likes = blog.likes + 1
      const res = await blogService.update(blog)
      console.log(res)

      const updatedBlogs = blogs
      updatedBlogs[updatedBlogs.findIndex(b => b.id === blog.id)].likes = blog.likes
      setBlogs(updatedBlogs)

      setSuccessMessage(`Likes of blog "${blog.title}" were updated`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    } catch (ex) {
      console.log(ex.response)
      setErrorMessage(ex.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <table>
          <tbody>
          <tr>
            <td>Username</td>
            <td>
              <input type='text' value={username} name='Username'
                     onChange={({ target }) => setUsername(target.value)}/>
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input type='password' value={password} name='Password'
                     onChange={({ target }) => setPassword(target.value)}/>
            </td>
          </tr>
          </tbody>
        </table>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
  const blogList = () => (
    <div>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm onBlogAdded={handleBlogAdded} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} />
      )}
    </div>
  )

  return(
    <div>
      <h1>Blogs</h1>
      {errorMessage && <Notification text={errorMessage} isError />}
      {successMessage && <Notification text={successMessage} />}
      {user === null && loginForm()}
      {user !== null && blogList()}
    </div>
  )
}

export default App