const initialState = {
  message: ''
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MSG':
      clearTimeout(state.timer)
      return action.data
    case 'CLEAR_MSG':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  console.log(message)
  return dispatch => {
    dispatch({
      type: 'SET_MSG',
      data: {
        message,
        timer: setTimeout(() => {
          dispatch(clearNotification())
        }, time * 1000)
      }
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_MSG'
  }
}

export default notificationReducer