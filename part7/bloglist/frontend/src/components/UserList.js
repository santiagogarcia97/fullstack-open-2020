import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const UserList = () => {
  const userList = useSelector(({ userList }) => userList)
  return(
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
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
      </table>
    </div>
  )
}

export default UserList