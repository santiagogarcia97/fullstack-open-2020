module.exports = () => {
  return authors.map(author => {
    const bookCount = books.reduce((n, book) => {
      return n + (book.author === author.name)
    }, 0)
    return {...author, bookCount}
  })
}