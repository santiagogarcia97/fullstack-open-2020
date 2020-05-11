module.exports = (root, args) => {
  if (args.author && args.genre) {
    return books
      .filter(book => book.author === args.author && book.genres.includes(args.genre))
  }
  if (args.author) {
    return books.filter(book => book.author === args.author)
  }
  if (args.genre) {
    return books.filter(book => book.genres.includes(args.genre))
  }
  return books
}