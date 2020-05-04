import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from  '../reducers/anecdoteReducer'
import  {setMessage, clearMessage} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes}) => anecdotes.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = anecdote => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote.id))
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