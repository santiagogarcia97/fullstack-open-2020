import React from 'react'
import { useSelector } from 'react-redux'

const UserList = () => {
  const userList = useSelector(({ userList }) => userList)
  return(
    <div>
      <table>
        <thead>
          <td></td>
          <td>Blogs created</td>
        </thead>
        <tbody>
          {userList.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList