import React from 'react'

const LoginForm = (props) => {

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={props.handleLogin}>
        <table>
          <tbody>
            <tr>
              <td>Username</td>
              <td>
                <input type='text' value={props.username} name='Username' id='username'
                  onChange={({ target }) => props.setUsername(target.value)}/>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input type='password' value={props.password} name='Password' id='password'
                  onChange={({ target }) => props.setPassword(target.value)}/>
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