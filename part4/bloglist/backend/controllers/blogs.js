const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs.map(b => b.toJSON()))
})

blogRouter.post('/', async (req, res, next) => {
  const body = req.body
  const user = await User.findOne({})
//  if(!user) next({message: 'invalid user', statusCode: 400})

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)

  await user.save()
  res.status(201).json(result.toJSON())
})

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async (req, res) => {
  const blog = req.body

  const result = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(result.toJSON())
})

module.exports = blogRouter