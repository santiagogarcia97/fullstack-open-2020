import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './notificationReducer'

const allReducer = combineReducers({
  notification: notificationReducer
})

export default createStore(
  allReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)