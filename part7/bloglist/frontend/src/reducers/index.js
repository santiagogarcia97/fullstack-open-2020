import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import authReducer from './authReducer'

const allReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: authReducer
})

export default createStore(
  allReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)