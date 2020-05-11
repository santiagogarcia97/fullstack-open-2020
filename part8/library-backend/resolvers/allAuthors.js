const Author = require('../models/Author')

module.exports = async (root, args) => {
    return await Author.find({}).populate({path: 'books'})
}