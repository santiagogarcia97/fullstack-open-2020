const {UserInputError} = require('apollo-server')
const Book = require('../models/Book')

module.exports = (root, args) => {
  try {
  // if (args.author && args.genre) {
  //   return books
  //     .filter(book => book.author === args.author && book.genres.includes(args.genre))
  // }
  // if (args.author) {
  //   return books.filter(book => book.author === args.author)
  // }
  if (args.genre) {
    return Book.find({ genres: { $in: [args.genre] } })
      .populate('author')
  }
  return Book.find({}).populate('author')
  } catch (err) {
    throw new UserInputError(err.message, {
      invalidArgs: args
    })
  }
}