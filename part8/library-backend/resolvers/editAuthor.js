const {UserInputError, AuthenticationError} = require('apollo-server')
const Author = require('../models/Author')

module.exports = async (root, args, {currentUser}) => {

  if (!currentUser) {
    throw new AuthenticationError("not authenticated")
  }
  try{
    return Author.findOneAndUpdate(
      {name: args.name},
      {born: args.setBornTo},
      {new: true}
    )
  } catch (err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    })
  }
}