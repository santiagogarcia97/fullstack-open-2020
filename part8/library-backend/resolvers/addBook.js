const Book  = require('../models/Book')

module.exports = async (root, args) => {
  const book = new Book({...args})

  const savedBook = await book.save()

  return savedBook
}