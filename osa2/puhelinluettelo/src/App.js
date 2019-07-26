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

  // Henkilön lisääminen osoitekirjaan
  const addPerson = (event) => {
    event.preventDefault()

    // Jos henkilön nimi on jo kirjassa, estä sen lisäys
    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
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
      handleNumberChange
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
    />
  )

}

export default App
