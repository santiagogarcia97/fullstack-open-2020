import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLikeClick = () => {
    updateLikes(blog)
  }

  const handleDeleteClick = () => {
    if(window.confirm(`Remove blog "${blog.title}"?`))
      deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <p>
        {blog.title}
        <button onClick={handleShowInfo}>{showInfo ? 'hide' : 'view'}</button>
      </p>
      <p>
        {blog.author}
      </p>
      {showInfo ? (
        <div>
          <p>
            <a href={blog.url}>{blog.url}</a>
          </p>
          <p>
          Likes: {blog.likes} <button onClick={handleLikeClick}>Like</button>
          </p>
          {blog.user.username === user.username ? (
            <p>
              <button onClick={handleDeleteClick}>Delete</button>
            </p>
          )
            : null
          }
        </div>
      )
        : null}
    </div>
  )}

export default Blog
