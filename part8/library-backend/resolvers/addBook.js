const {UserInputError, AuthenticationError} = require('apollo-server')
const Book  = require('../models/Book')

module.exports = async (root, args, {currentUser}) => {

  if (!currentUser) {
    throw new AuthenticationError("not authenticated")
  }
  try {
    const book = new Book({...args})

    const savedBook = await book.save()
    return Book.populate(savedBook, {path:'author'})
  } catch (err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    })
  }

}