import React from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = () => {
  const match = useRouteMatch('/users/:id')
  const user = useSelector(
    ({ userList }) => userList.find(u => u.id === match.params.id))

  return(
    user
      ? <div className='text-center'>
        <h2>{user.name}</h2>
        <p><strong>{user.blogs.length}</strong> blogs created</p>
        <ListGroup >
          {user.blogs.map(b =>
            <ListGroup.Item key={b.id}>
              <Link to={`/blogs/${b.id}`}>{b.title}</Link>
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>
      : null

  )
}

export default User