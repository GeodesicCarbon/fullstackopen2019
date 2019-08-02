// luetaan configuroitimuuttujat
require('dotenv').config()

// Sisällytetään backend
const express = require('express')

// Middlewaret
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// Moduulit
const Person = require('./models/person.js')

// rekisteräidään middlewaret
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

// luodaan morganille uusi JSON-token
morgan.token('json-string', (req, res) => {
  if (req.is('application/json') && req.method === 'POST') {
    return JSON.stringify(req.body)
  } else {
    return ' '
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json-string'))

// Tuntematon URL middleware
const unknownEndpoint = (req, res) => {
  response.status(404).send({error: 'unknownEndpoint'})
}

// Virheenkäsittely middleware
const errorHandler = (error, request, response, next) => {
  console.error('[ErrorHandler]', error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({error: 'malformatted id'})
  }

  next(error)
}

// esimerkkihenkilöt
let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  },
  {
    name: "Alan Turing",
    number: "01-01-100110",
    id: 5
  }
]

// näytetään juurta varten tervetulosivu
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the FULLSTACK phonebook!</h1>')
})

// tarjotaan info-sivu
app.get('/info', (req, res) => {
  const peopleCount = persons.length
  Person.countDocuments({})
    .then(count => {
      const timeNow = new Date()
      res.send(
        `<p>Phonebook has info for ${count} people</p>
        <p>${timeNow}</p>`
      )
    })
})

// tarjotaan JSON-taulukko
app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people.map(person => person.toJSON()))
  })
})

// tarjotaan yhden henkilön tiedot JSON-muodossa
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person.toJSON())
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

// ID generointi siirretty MongoDB-palvelimeen. Jätetään varalle
// ---
// // Generoidaan ID uudelle henkilölle
// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(p => p.id))
//     : 0
//   return maxId + 1
// }

// lisätääm uusi henkilö puhelinluetteloon
app.post('/api/persons', (req, res) => {
  const body = req.body

  // tarkistetaan, että sisältö on olemassa
  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }
  // tarkistetaan, että nimi ei ole jo olemassa puhelinluettelossa
  Person.findOne({"name": body.name})
  .then(result => {
    if (result !== null) {
      return res.status(409).json({
        error: 'name already exists'
      })
    }

    const person = new Person ({
      name: body.name,
      number: body.number,
    })

    person.save().then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
  })
})

// Päivitetään henkilöiden tiedot
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// poistetaan taulukosta henkilö id-tunnuksella
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
  .then(person =>{
    res.status(204).end()
  })
  .catch(error => next(error))
})

// Tarjotaan 404-sivu jos URL:ä ei löydy palvelimelta
app.use(unknownEndpoint)

// Rekisteräidään virheenkäsittelijä
app.use(errorHandler)

 // asetetaan palvelin kuuntelemaan määriteltyä porttia
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
