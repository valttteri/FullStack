const logger = require('./logger')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  } else {
    next()
  }
}

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send( { error: 'invalid id' } )
  } else if (error.name === 'ValidationError') {
    return res.status(400).json( { error: error.message } )
  } else if (error.name ===  'JsonWebTokenError') {
    return res.status(400).json( { error: 'token missing or invalid' } )
  } else {
    res.status(400).send( { message: 'Somethings wrong, I can feel it' } )
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}