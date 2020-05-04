
const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MSG':
      return action.data.message
    case 'CLEAR_MSG':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  console.log(message)
  return dispatch => {
    dispatch({
      type: 'SET_MSG',
      data: { message }
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_MSG'
  }
}

export default notificationReducer