const blogRouter = require('express').Router()
const Blog = require('../models/blog')

//render initial posts to back end
blogRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

//create a new post
blogRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  if (req.body.title === undefined || req.body.url === undefined) {
    res.status(400).json( { error: 'content missing' } )
  } else {
    blog.save().then(result => {
      res.status(201).json(result)
    })
  }
})

//delete a post
blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

//update a post
blogRouter.put('/:id', async (req, res, next) => {
  const blog = req.body
  const id = req.params.id

  try {
    await Blog.findByIdAndUpdate(id, blog)
  } catch (error) {
    next(error)
  }
  res.status(200).end()
})

module.exports = blogRouter