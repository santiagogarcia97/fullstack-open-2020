import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const allReducer = combineReducers({
  anecdotes: anecdoteReducer,
  message: notificationReducer
})

export default createStore(allReducer, composeWithDevTools())