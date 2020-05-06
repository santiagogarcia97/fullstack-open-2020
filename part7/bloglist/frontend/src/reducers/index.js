import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './notificationReducer'
import blogReducer from './blogReducer'
import authReducer from './authReducer'
import userReducer from './userReducer'

const allReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: authReducer,
  userList: userReducer
})

export default createStore(
  allReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)