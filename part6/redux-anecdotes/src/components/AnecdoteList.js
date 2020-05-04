import React from 'react'
import {connect} from 'react-redux'
import { voteAnecdote } from  '../reducers/anecdoteReducer'
import  {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = anecdote => {
    props.voteAnecdote(anecdote)
    props.setNotification(`You voted "${anecdote.content}"`, 5)
  }

  return(
    <div>
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  if ( state.filter !== '' ) {
    let anecdotes = state.anecdotes.filter((a) => a.content.indexOf(state.filter) !== -1)
    anecdotes.sort((a, b) => b.votes - a.votes)
    return {
      anecdotes
    }
  }
  return {
    anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes