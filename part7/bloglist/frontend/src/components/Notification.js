import React from 'react'
import { useSelector } from 'react-redux'
import {Alert, Col, Row} from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const variant = notification.isError ? 'danger' : 'success'

  return notification.message !== ''
    ? <Row className='text-center m-3'>
      <Col className='mx-auto'>
        <Alert variant={variant}>{notification.message}</Alert>
      </Col>
    </Row>
    : null
}

export default Notification