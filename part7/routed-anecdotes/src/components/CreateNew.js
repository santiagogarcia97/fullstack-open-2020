import React from 'react'
import {useField} from '../hooks'

const CreateNew = (props) => {

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.input.value,
      author: author.input.value,
      info: info.input.value,
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
            <td><input {...content.input} /></td>
          </tr>
          <tr>
            <td>Author</td>
            <td><input {...author.input} /></td>
          </tr>
          <tr>
            <td>URL for more info</td>
            <td><input {...info.input} /></td>
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