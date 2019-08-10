// Ladataan tarvittavat konfiguraatioparametrit
const config = require('./utils/config')

// Ladataan tarvittavat moduulit
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

// Ladataan kontrolleri
const blogsRouter = require('./controllers/blogs')

// Yhdistetään MongoDB-tietokantaan
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })

// Määritellään express-moduuli ja sen middlewaret
const app = express()
app.use(cors())
app.use(bodyParser.json())

// Yhdistetään kontrolleri moduuliin
app.use('/api/blogs', blogsRouter)

module.exports = app
