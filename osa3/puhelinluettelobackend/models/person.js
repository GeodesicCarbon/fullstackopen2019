const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

// EI SALASANOJA GITHUBIIN
const url = process.env.MONGODB_URI

// Luodaan prefiksi lokeja varten
const logPrefix = '[MONGOOSE]'

// Yhdistetään Atlas MongoDB -palvelimeen
mongoose.connect(url, {useNewUrlParser:true})
  .then(result => {
    console.log(logPrefix, 'connected to MongoDB')
  })
  .catch(error => {
    console.log(logPrefix, 'unable to connect:', error.message)
  })

// Luodaan skeema henkilöobjektille
const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

// Muokataan tietokannalta saadun objektin muotoa helpommin käsiteltäväksi
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
