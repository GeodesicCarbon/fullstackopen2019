import React, { useState } from 'react'
import Phonebook from './components/Phonebook'

const App = () => {
  // Testihenkilöt
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  // Uuden henkilön tiedot
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  // Suodattimen tiedot
  const [ filter, setFilter] = useState('')

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
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
