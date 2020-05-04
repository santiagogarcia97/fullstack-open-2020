import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(({notification}) => notification.message)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    message !== '' ? (
      <div style={style}>
        {message}
      </div>
    ) : null
  )
}

export default Notification