import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from  '../reducers/anecdoteReducer'
import  {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.newAnecdote(content)
    props.setNotification(`The new anecdote has been added to the list: "${content}"`, 2)
  }

  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  newAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm