import React, { useState } from "react"

const AddBlog = ({ onBlogAdded }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleNewBlogSubmit = event => {
    event.preventDefault()
    onBlogAdded({title, author, url})
  }

  return (
    <form onSubmit={handleNewBlogSubmit}>
      <p>
        title
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </p>
      <p>
        author
        <input
          id="author"
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </p>
      <p>
        url
        <input
          id="url"
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </p>
      <button type="submit">create</button>
    </form>
  )
}

export default AddBlog