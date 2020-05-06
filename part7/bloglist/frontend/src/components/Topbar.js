import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../reducers/authReducer'
import {Link} from 'react-router-dom'

const Topbar = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout())
  }

  if(!user) return null

  return(
    <div>
      <Link to='/'>Blogs</Link>
      <Link to='/users'>Users</Link>
      <strong>{user.name}</strong> logged in
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Topbar