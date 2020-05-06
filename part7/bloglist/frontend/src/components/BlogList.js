import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import React from 'react'

const BlogList = (props) => {

  return (
    <div>
      <Togglable buttonLabel='New Blog' ref={props.blogFormRef}>
        <BlogForm onBlogAdded={props.handleBlogAdded}/>
      </Togglable>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={props.updateLikes}
          deleteBlog={props.deleteBlog} user={props.user}/>
      )}
    </div>
  )
}

export default BlogList