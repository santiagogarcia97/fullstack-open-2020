import React from 'react'
import { login } from '../reducers/authReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'
import { useHistory } from 'react-router-dom'

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
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  if(user) return null

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <table>
          <tbody>
            <tr>
              <td>Username</td>
              <td>
                <input {...username.input}/>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input {...password.input}/>
              </td>
            </tr>
          </tbody>
        </table>
        <button id='login-button' type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm