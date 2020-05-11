require('dotenv').config()

module.exports = {
  MONGO_URL: process.env.MONGO_URL,
  SECRET_SIGN: process.env.SECRET_SIGN
}