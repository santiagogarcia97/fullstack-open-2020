const {UserInputError} = require('apollo-server')
const {SECRET_SIGN} = require('../utils/config')
const jwt = require('jsonwebtoken')
const User  = require('../models/User')

module.exports = async (root, args) => {
  const user = await User.findOne({username: args.username})

  if(!user || args.password !== "secret") {
    throw new UserInputError("login failed")
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  return {value: jwt.sign(userForToken, SECRET_SIGN)}

}