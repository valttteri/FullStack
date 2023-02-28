const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { tokenExtractor } = require('../utils/middleware')

const getTokenFrom = req => {
  const authorization = req.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

//render initial posts to back end
blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  res.json(blogs)
})

//create a new post
blogRouter.post('/', async (req, res) => {
  const body = req.body
  //const token = req.token

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

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