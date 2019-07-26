import React from 'react'

// Otsikkokomponentti
const Header = ({header}) => (
  <h2>{header}</h2>
)

// Henkilöiden esittäminen taulukkomuodossa
const Person = ({person, deletePerson}) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><button onClick={() => deletePerson(person.id)}> Delete contact </button></td>
    </tr>
)

// Luo taulukon osoitekirjaa varten
const Persons = ({persons, deletePerson}) => (
  <table>
    <tbody>
      {persons.map(person =>
          <Person
            key={person.name}
            person={person}
            deletePerson={deletePerson}
          />
      )}
    </tbody>
  </table>
)

// Lomake henkilöiden lisäämistä varten
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

// Lomake suodattimelle
const FilterForm = ({filterForm}) => (
  <div>
    name: <input
            value={filterForm.filter}
            onChange={filterForm.handleFilterChange}
          />
  </div>
)

// Osoitekirjan luova komponentti.
const Phonebook = ({personForm, filterForm, persons}) => {
  return (
    <div>
      <Header header='Phonebook' />
      <FilterForm filterForm={filterForm} />
      <Header header='Add a new number' />
      <PersonForm personForm={personForm} />
      <Header header='Number' />
      <Persons persons={persons} deletePerson={personForm.deletePerson}/>
    </div>
  )
}

export default Phonebook
