const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

//render initial posts to back end
blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  res.json(blogs)
})

//render a single blog
blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', { name: 1, username: 1 })

  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

//create a new post
blogRouter.post('/', async (req, res) => {
  const body = req.body
  const token = req.token
  const user = req.user

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (body.title === undefined || body.url === undefined) {
    res.status(400).json( { error: 'blog content missing' } )
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.json(savedBlog)
  }
})

//delete a post
blogRouter.delete('/:id', async (req, res) => {
  const user = req.user
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing' })
  }

  const blogToDelete = await Blog.findById(req.params.id)
  const blogId = blogToDelete.user.toString()
  const userId = user.id.toString()

  if (blogId === userId) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end
  } else {
    res.status(400).json( { error: 'incorrect token' } )
  }
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