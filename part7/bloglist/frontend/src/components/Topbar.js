import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../reducers/authReducer'
import {Link} from 'react-router-dom'
import {Navbar, Nav, Button, Container} from 'react-bootstrap'

const Topbar = () => {
  const user = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout())
  }

  return(
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>Blogs List App</Navbar.Brand>
        { user
          ? <>
            <Nav className='mr-auto'>
              <Link to='/blogs' className='mx-1 text-light'>Blogs</Link>
              <Link to='/users' className='mx-1 text-light'>Users</Link>
            </Nav>
            <Nav>
              <Link to={`/users/${user.id}`} className='m-auto text-white font-weight-bold'>{user.name}</Link>
              <Button className='mx-1' variant='outline-info' onClick={handleLogout}>Logout</Button>
            </Nav>
          </>
          : null
        }
      </Container>
    </Navbar>
  )
}

export default Topbar