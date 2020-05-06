import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'

const User = () => {
  const match = useRouteMatch('/users/:id')
  const user = useSelector(
    ({ userList }) => userList.find(u => u.id === match.params.id))

  return(
    user
      ? <div>
        <h2>{user.name}</h2>
        <ul>
          {user.blogs.map(b =>
            <li key={b.id}>
              <Link to={`/blogs/${b.id}`}>{b.title}</Link>
            </li>
          )}
        </ul>
      </div>
      : null

  )
}

export default User