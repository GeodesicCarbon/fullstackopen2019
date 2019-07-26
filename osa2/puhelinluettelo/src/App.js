import React, { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import personService from './services/persons'

const App = () => {
  // Henkilökokoelma
  const [ persons, setPersons] = useState([])
  // Uuden henkilön tiedot
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  // Suodattimen tiedot
  const [ filter, setFilter] = useState('')
  // ilmoituksen tiedot
  const [notification, setNotification] = useState({message: null, type:null})

  // haetaan tiedot paikalliselta JSON-palvelimelta
  useEffect(() => {
    personService
      .getAll()
      .then(intialPersons => {
        setPersons(intialPersons)
      })
  }, [])

  // Jos suodatin ei ole tyhjä, muuta nimet ja suodatin
  // pieniksi kirjaimikse ja suodata näytetävät numerot
  const personsToShow = !filter
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(
            filter.toLowerCase())
          )

  // Funktio, joka luo ilmoituksen sekä sen palautuksen
  // 5s kuluttua
  const notify = (message, type) => {
    setNotification({
      message: message,
      type: type
    })
    setTimeout(() => {
      setNotification({
        message: null,
        type: null
      })
    }, 5000)
  }

  // Nimikentän muutosfunktio
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Numerokentän muutosfunktio
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // Suodatinkentän muutosfunktio
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  // Henkilön poistofunktio
  const deletePerson = id => {
    // etsitään oikea objekti
    const person = persons.find(person => person.id === id)
    // varmistetaan, että henkilö halutaan poistaa
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        // ilmoitetaan onnistuneesta poistosta
        notify(
          `'${person.name}' has been deleted`,
          'success'
        )
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        // Jos henkilö on jo poistettu, tehdää siitä ilmoitus
         notify(
           `'${person.name}' was already deleted from server`,
           'error'
         )
         setPersons(persons.filter(p => p.id !== id))
       })

     }
  }

  // Henkilön lisääminen osoitekirjaan
  const addPerson = (event) => {
    event.preventDefault()

    // Jos henkilön nimi on jo kirjassa, kysy jos halutaan päivitää se
    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook. Would you like update the number?`)) {
        // Alkuperäinen objekti
        const oldPerson = persons.find(person => person.name === newName)
        // Päivitetty objekti
        const changedPerson = {...oldPerson, number: newNumber}

        // Päivitetään tietokanta
        personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          // ilmoitetaan onnistuneesta päivityksestä
          notify(
            `'${oldPerson.name}' has been updated`,
            'success'
          )
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
        })
        .catch(error => {
          // ilmoitetaan virheestä
          notify(
            `Unable to update. '${oldPerson.name}' has already been removed from server`,
            'error'
          )
          setPersons(persons.filter(p => p.id !== oldPerson.id))
         })
      }
    } else {
      // Jos henkilöä ei vielä ole lisätty, tehdään se
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          // ilmoitetaan onnistuneesta lisäyksestä
          notify(
            `'${returnedPerson.name}' has been added`,
            'success'
          )
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  // Kerää yhteen kokoelmaobjektiin kaikki lisäämislomakkeen
  // tarvittavat objektit
  const personForm = {
      addPerson,
      newName,
      handleNameChange,
      newNumber,
      handleNumberChange,
      deletePerson
    }

  // Same suodatinkentälle
  const filterForm = {
    filter,
    handleFilterChange
  }

  return (
    <Phonebook
      personForm={personForm}
      filterForm={filterForm}
      persons={personsToShow}
      notification={notification}
    />
  )

}

export default App
