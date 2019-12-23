// Ladataan tarvittavat konfiguraatioparametrit
const config = require('./utils/config')

// Ladataan tarvittavat moduulit
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

// Ladataan kontrollerit
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// Yhdistetään MongoDB-tietokantaan
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true ,
  useFindAndModify: false,
  useCreateIndex: true
})

// Määritellään express-moduuli ja sen middlewaret
const app = express()
app.use(cors())
app.use(bodyParser.json())

// Yhdistetään kontrolleri moduuliin
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app
