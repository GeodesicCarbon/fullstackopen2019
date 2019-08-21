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
  }
  next(err)
}

module.exports = {
  errorHandler
}
