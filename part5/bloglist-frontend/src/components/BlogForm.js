import React, { useState } from "react"

const BlogForm = ({ onBlogAdded }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleNewBlogSubmit = event => {
    event.preventDefault()
    onBlogAdded({title, author, url})
  }

  return (
    <form onSubmit={handleNewBlogSubmit}>
      <table>
        <tbody>
        <tr>
          <td>Title</td>
          <td>
            <input id="title" type="text" value={title}
                   onChange={e => setTitle(e.target.value)}/>
          </td>
        </tr>
        <tr>
          <td>Author</td>
          <td>
            <input id="author" type="text" value={author}
                   onChange={e => setAuthor(e.target.value)}/>
          </td>
        </tr>
        <tr>
          <td>URL</td>
          <td>
            <input id="url" type="text" value={url}
                   onChange={e => setUrl(e.target.value)}/>
          </td>
        </tr>
        </tbody>
      </table>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm