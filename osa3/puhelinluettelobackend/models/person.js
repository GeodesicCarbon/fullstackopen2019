const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// korjatan deprecation-huomautukset
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// EI SALASANOJA GITHUBIIN
const url = process.env.MONGODB_URI

// Luodaan prefiksi lokeja varten
const logPrefix = '[MONGOOSE]'

// Yhdistetään Atlas MongoDB -palvelimeen
mongoose.connect(url, { useNewUrlParser:true })
  .then(() => {
    console.log(logPrefix, 'connected to MongoDB')
  })
  .catch(error => {
    console.log(logPrefix, 'unable to connect:', error.message)
  })

// Luodaan skeema henkilöobjektille
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name is too short'],
    required: [true, 'Name is required'],
    unique: true,
  },
  number: {
    type: String,
    minlength: [8, 'Phone number is too short'],
    required: [true,'Phone number is required'],
  }
})

// käytetään uniqueValidator-pluginiä skeemalla
personSchema.plugin(uniqueValidator, { message: '{VALUE} is already added to the phonebook' })

// Muokataan tietokannalta saadun objektin muotoa helpommin käsiteltäväksi
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
