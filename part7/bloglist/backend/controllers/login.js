const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const body = req.body
  if(!body.username || !body.password)
    return res.status(400).send({error: 'missing information'})

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, config.SECRET)

  res
    .status(200)
    .send({
      token,
      username: user.username,
      name: user.name,
      id: user.id
    })
})

module.exports = loginRouter