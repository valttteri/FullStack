const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body

  if (username === undefined || password === undefined || password.length < 3 || username.length < 3) {
    res.status(400).json( { error: 'user content missing or invalid' } )
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      name,
      username,
      passwordHash,
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  }

})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
  res.json(users)
})

module.exports = usersRouter