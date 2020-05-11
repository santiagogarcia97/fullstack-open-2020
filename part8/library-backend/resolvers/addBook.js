const {UserInputError} = require('apollo-server')
const Book  = require('../models/Book')

module.exports = async (root, args) => {
  try {
    const book = new Book({...args})

    const savedBook = await book.save()

    return savedBook
  } catch (err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    })
  }

}