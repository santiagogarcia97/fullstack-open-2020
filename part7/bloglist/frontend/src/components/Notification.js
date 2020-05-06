import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const cssClass = notification.isError ? 'error' : 'notification'

  return notification.message !== ''
    ? <p className={cssClass}>{notification.message}</p>
    : null
}

export default Notification