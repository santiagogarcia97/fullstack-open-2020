const initMessage = 'Default message'

const notificationReducer = (state = initMessage, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  return state
}

export const setMessage = message => {
  return {
    type: 'SET_MSG',
    data: { message }
  }
}

export default notificationReducer