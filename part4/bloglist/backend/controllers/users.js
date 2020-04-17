const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res, next) => {
  const body = req.body

  if(!body.username || !body.password)
    next({message: 'missing password or username', statusCode: 400})
  if(body.password.length < 3)
    next({message: 'password minlenght  3', statusCode: 400})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.json(savedUser.toJSON())
})

module.exports = usersRouter