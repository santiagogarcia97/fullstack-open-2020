import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'INIT_ANECDOTES':
      return action.data
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    case 'VOTE_ANECDOTE':
      const updatedAnecdote = action.data
      return state.map(a =>
        a.id !== updatedAnecdote.id ? a : updatedAnecdote
      )
    default:
      return state
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    anecdote.votes++
    await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: anecdote
    })
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: anecdote
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer