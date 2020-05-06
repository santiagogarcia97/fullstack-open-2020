import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'

const allReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer
})

export default createStore(
  allReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)