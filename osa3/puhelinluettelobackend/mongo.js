const mongoose = require('mongoose')

// tarkistetaan, että on salasanaargumentti
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

// Yhdistetään Atlas MongoDB -palvelimeen
password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@fullstack2019-dzwdj.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true})

// Luodaan skeema henkilölle
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

// Jos argumenttejä on viisi, otetaan kahdesta viimeisestä nimi ja numero
// ja luodaan uusi henkilö puhelinluetteloon
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name: name,
    number: number
  })
  person.save().then(response => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
// Muutoin tulostetaan puhelinluettelon sisältö
} else {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
