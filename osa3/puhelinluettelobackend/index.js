const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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

// tarjotaan JSON-taulukko
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// tarjotaan yhden henkilön tiedot JSON-muodossa
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find( person  => person.id === id)
  if (person) res.json(person)
  else res.status(404).end()
})

// tarjotaan info-sivu
app.get('/info', (req, res) => {
  const peopleCount = persons.length
  const timeNow = new Date()
  res.send(
    `<p>Phonebook has info for ${peopleCount} people</p>
    <p>${timeNow}</p>`
  )
})

 // asetetaan palvelin kuuntelemaan porttia 3001
const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
