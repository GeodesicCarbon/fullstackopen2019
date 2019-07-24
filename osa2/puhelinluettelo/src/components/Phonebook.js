import React from 'react'

const Person = ({person}) => (
  <tr><td>{person.name}</td><td>{person.number}</td></tr>
)

const Persons = ({persons}) => (
  <table>
    <tbody>
      {persons.map(person =>
          <Person
            key={person.name}
            person={person}
          />
      )}
    </tbody>
  </table>
)

const PersonForm = ({personForm}) => (
  <form onSubmit={personForm.addPerson}>
    <div>
      name: <input
              value={personForm.newName}
              onChange={personForm.handleNameChange}
            />
    </div>
    <div>
      number: <input
              value={personForm.newNumber}
              onChange={personForm.handleNumberChange}
            />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Phonebook = ({personForm, persons}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm personForm={personForm} />
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )
}

export default Phonebook
