import React, { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/authReducer'
import UserList from './components/UserList'
import {initUsersList} from './reducers/userReducer'
import Menu from './components/Menu'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsersList())
  }, [dispatch, blogs])

  return(
    <div>
      <h1>Blogs List App</h1>
      <LoginForm />
      { user && <Menu />}

      <Switch>
        <Route path='/blogs/:id'>
          { user && <Blog />}
        </Route>
        <Route path='/users/:id'>
          { user && <User />}
        </Route>
        <Route path='/users'>
          { user && <UserList />}
        </Route>
        <Route path='/'>
          { user && <BlogList />}
        </Route>
      </Switch>

      <Notification/>
    </div>
  )
}

export default App