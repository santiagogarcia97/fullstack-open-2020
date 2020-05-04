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

export const setMessage = message => {
  return {
    type: "SET_MSG",
    data: { message }
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MSG'
  }
}

export default notificationReducer