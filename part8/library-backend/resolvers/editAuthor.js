const {UserInputError} = require('apollo-server')
const Author = require('../models/Author')

module.exports = async (root, args) => {
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