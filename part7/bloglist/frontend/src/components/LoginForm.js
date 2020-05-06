import React from 'react'
import { login, logout } from '../reducers/authReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useField } from '../hooks'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({
        username: username.input.value,
        password: password.input.value
      }))
      username.reset()
      password.reset()
    } catch (ex) {
      dispatch(setNotification(ex.response.data.error, 3, true))
    }
  }

  const handleLogout = async () => {
    dispatch(logout())
    username.reset()
    password.reset()
  }

  return (
    <div>
      { !user
        ? <>
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
        </>
        : <p>
          <strong>{user.name}</strong> logged in
          <button onClick={handleLogout}>Logout</button>
        </p>
      }
    </div>
  )
}

export default LoginForm