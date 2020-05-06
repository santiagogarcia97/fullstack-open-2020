import React, { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/authReducer'

const App = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  return(
    <div>
      <h1>Blogs</h1>
      <Notification/>
      <LoginForm />
      { user && <BlogList />}
    </div>
  )
}

export default App