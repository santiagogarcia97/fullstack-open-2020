const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
  const blog = new Blog(req.body)

  const result = await blog.save()
  res.status(201).json(result)
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