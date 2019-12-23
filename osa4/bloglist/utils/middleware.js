const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  // eslint no-undef: 'field'
  switch (err.name) {
  case 'ValidationError':
    for (const field in err.errors) {
      switch (err.errors[field].kind) {
      case 'unique':
      case 'minlength':
        return res.status(409).json({ error: err.errors[field].message })
      case 'required':
        return res.status(400).json({ error: err.errors[field].message })
      }
    }
    break
  case 'JsonWebTokenError':
    return res.status(401).json({
      error: 'invalid token'
    })
  }
  next(err)
}

// Hakee mahdollisen tokenin pyynnön kentästä
const tokenExtractor = (req, res, next) => {
  req.token = null
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}
