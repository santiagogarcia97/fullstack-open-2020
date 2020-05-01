import React from 'react'

const Notification = ({ text, isError = false }) => {
  const cssClass = isError ? 'error' : 'notification'
  return <p className={cssClass}>{text}</p>
}

export default Notification