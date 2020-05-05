import React from 'react'
import {useField} from '../hooks'

const CreateNew = (props) => {

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }
  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
          <tr>
            <td>Content</td>
            <td><input {...content} /></td>
          </tr>
          <tr>
            <td>Author</td>
            <td><input {...author} /></td>
          </tr>
          <tr>
            <td>URL for more info</td>
            <td><input {...info} /></td>
          </tr>
          </tbody>
        </table>
        <button type='submit'>Create</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  )
}

export default CreateNew