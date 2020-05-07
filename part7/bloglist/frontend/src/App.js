import React, { useEffect } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/authReducer'
import { initUsersList } from './reducers/userReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Topbar from './components/Topbar'
import { Container } from 'react-bootstrap'

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
    <>
      <Topbar />
      <Container className='my-5'>
        <LoginForm />
        { user
          ? <Switch>
            <Route path='/blogs/:id'>
              <Blog />
            </Route>
            <Route path='/users/:id'>
              <User />
            </Route>
            <Route path='/users'>
              <UserList />
            </Route>
            <Route path='/'>
              <BlogList />
            </Route>
          </Switch>
          : null
        }
        <Notification/>
      </Container>
    </>
  )
}

export default App