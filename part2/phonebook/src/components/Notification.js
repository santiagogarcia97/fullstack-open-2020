import React from "react";

const Notification = ({ notification }) => {
  if (notification.message === '') {
    return null
  }

  const cssClass = notification.isError ? 'error' : 'success'

  return (
    <div className={`notify ${cssClass}`}>
      {notification.message}
    </div>
  )
}

export default Notification