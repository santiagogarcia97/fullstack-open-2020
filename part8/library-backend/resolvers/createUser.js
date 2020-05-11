const {UserInputError} = require('apollo-server')
const User  = require('../models/User')

module.exports = async (root, args) => {
  const user = new User({...args})
  try {
    return user.save()
  } catch (err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    })
  }
}