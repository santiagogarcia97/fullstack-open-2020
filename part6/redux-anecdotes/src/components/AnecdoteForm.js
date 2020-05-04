import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from  '../reducers/anecdoteReducer'
import  {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(content))
    dispatch(setNotification(`The new anecdote has been added to the list: "${content}"`, 2))
    // dispatch(setMessage(`The new anecdote has been added to the list: "${content}"`))
    // setTimeout(() => {
    //   dispatch(clearMessage())
    // }, 5000)
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

export default AnecdoteForm