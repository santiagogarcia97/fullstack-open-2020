import React, { useState, useEffect } from 'react'
import "./App.css";
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

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

  const handleBlogAdded = async newBlog => {
    try {
      const blog = await blogService.create(newBlog)
      console.log(blog)
      setBlogs(blogs.concat(blog))
      setSuccessMessage(`a new blog ${blog.title} by ${blog.author} was added`)
      setTimeout(() => {
        setSuccessMessage("")
      }, 5000)
    } catch (ex) {
      console.log(ex.response)
      setErrorMessage(ex.response.data.error)
      setTimeout(() => {
        setErrorMessage("")
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
        <div>username
          <input type="text"
                 value={username}
                 name="Username"
                 onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>password
          <input type="password"
                 value={password}
                 name="Password"
                 onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
  const blogList = () => (
    <div>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <p>
        <AddBlog onBlogAdded={handleBlogAdded} />
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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