require('dotenv').config()

let MONGO_URL = process.env.MONGO_URL
let PORT = process.env.PORT
let SECRET = process.env.SECRET

if (process.env.NODE_ENV === 'test')
  MONGO_URL = process.env.TEST_MONGO_URL

module.exports = {
  MONGO_URL,
  PORT,
  SECRET
}