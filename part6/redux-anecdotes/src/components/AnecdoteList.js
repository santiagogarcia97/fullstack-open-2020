import React from 'react'
import {connect, useDispatch} from 'react-redux'
import { voteAnecdote } from  '../reducers/anecdoteReducer'
import  {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  // const anecdotes = useSelector(({anecdotes, filter}) => {
  //   if(filter !== '') {
  //     anecdotes = anecdotes.filter((a) => a.content.indexOf(filter) !== -1)
  //   }
  //   return anecdotes.sort((a, b) => b.votes - a.votes)
  // })
  const dispatch = useDispatch()


  const anecdotesToShow = () => {
    let anecdotes
    if(props.filter !== '') {
      anecdotes = props.anecdotes.filter((a) => a.content.indexOf(props.filter) !== -1)
    } else {
      anecdotes = props.anecdotes
    }
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted "${anecdote.content}"`, 5))
  }

  return(
    <div>
      {anecdotesToShow().map(anecdote =>
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
  // sometimes it is useful to console log from mapStateToProps
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdotes = connect(mapStateToProps)(AnecdoteList)
export default ConnectedAnecdotes