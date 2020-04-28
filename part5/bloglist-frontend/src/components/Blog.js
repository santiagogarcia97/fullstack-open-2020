import React, {useState} from 'react'

const Blog = ({ blog, updateLikes }) => {
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

  return (
  <div style={blogStyle}>
    <p>
      {blog.title}
      <button onClick={handleShowInfo}>{showInfo ? 'hide' : 'view'}</button>
    </p>
    {showInfo ? (
      <div>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          Likes: {blog.likes} <button onClick={handleLikeClick}>Like</button>
        </p>
        <p>
          {blog.author}
        </p>
      </div>
    )
      : null}
  </div>
)}

export default Blog
