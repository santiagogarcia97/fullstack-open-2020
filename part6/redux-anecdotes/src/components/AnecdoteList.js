import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from  '../reducers/anecdoteReducer'
import  {setMessage, clearMessage} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if(filter !== '') {
      anecdotes = anecdotes.filter((a) => a.content.indexOf(filter) !== -1)
    }
    return anecdotes.sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setMessage(`You voted "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(clearMessage())
    }, 5000)
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList