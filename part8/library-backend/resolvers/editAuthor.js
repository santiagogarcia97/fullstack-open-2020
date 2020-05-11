const Author = require('../models/Author')

module.exports = async (root, args) => {

  return Author.findOneAndUpdate(
    {name: args.name},
    {born: args.setBornTo},
    {new: true}
  )
}