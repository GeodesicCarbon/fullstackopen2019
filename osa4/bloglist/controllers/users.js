// Ladataan tarvittavat moduulit
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
// Ladataan käyttäjän MongoDB-skeema
const User = require('../models/user')

// Haetaan kaikkien käyttäjien tiedot
usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users.map(u => u.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body

    // luodaan uusi hash salasanasta
    const saltRounds = 10 // 10 on suositus, Elokuu 2019
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    // Luodaan uusi käyttäja skeeman pohjalta ja tallenetaan se tietokantaan
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })
    const savedUser = await user.save()

    // Palautetaan käyttäjän tiedot json-objektina
    res.status(201).json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
