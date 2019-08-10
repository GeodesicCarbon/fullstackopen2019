// ladataan parametrit .env -tiedostosta
require('dotenv').config()

// Määritellään parametrimuuttujat ja palautetaan ne
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}
