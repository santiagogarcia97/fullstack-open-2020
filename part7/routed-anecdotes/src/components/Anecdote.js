import React from 'react'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      by {anecdote.author}
      <div>has {anecdote.votes} votes</div>
      <div>{anecdote.info}</div>
    </div>
  )
}
export default Anecdote