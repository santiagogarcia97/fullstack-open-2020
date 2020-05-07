import React from 'react'
import { login } from '../reducers/authReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { useHistory } from 'react-router-dom'
import {Button, Form} from 'react-bootstrap'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({
        username: username.input.value,
        password: password.input.value
      }))
      username.reset()
      password.reset()
      history.push('/')
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 5, true))
    }
  }

  if(user) return null

  return (
    <div className='m-auto p-5 w-50 text-center'>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control {...username.input} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control {...password.input} />
        </Form.Group>
        <Button id='login-button' type='submit' block>Login</Button>
      </Form>
    </div>
  )
}

export default LoginForm