// Ladataan tarvittavat moduulit
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Luodaan mongoose-skeema käyttäjille ja palautetaan siitä malli
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  name: String,
  passwordHash: String,
  blogs : [ // Käyttäjän lisäämän blogeihin viitataan sen mallissa
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

// Käytetää uniqueValidator-pluginiä jotta validointi tapahtuisi backendissä
// eikä tietokannassa
userSchema.plugin(uniqueValidator)

// Luodaan funktio joka siivoaa objektin ja palauttaa sen JSON-muodossa
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // never reveal password hash
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)
