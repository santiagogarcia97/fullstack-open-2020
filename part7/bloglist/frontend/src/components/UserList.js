import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'

const UserList = () => {
  const userList = useSelector(({ userList }) => userList)
  return(
    <div className='text-center'>
      <h2>Users List</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th className='w-50'>User</th>
            <th className='w-50'>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList