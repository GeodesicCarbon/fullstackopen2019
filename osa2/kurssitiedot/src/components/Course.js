import React from 'react'

// Tulostaa otsikon
const Header = ({header}) => (
  <h2>{header}</h2>
)

// Poimii harjoitustus lukumäärän kurssiobjektista ja
// laskee niiden summan
const Total = ({parts}) => (
  <p><b>Total of {parts.map(part=>part.exercises).reduce((a,b) => a + b,0)} exercises </b></p>
)

// Kurssin osasta tulostetaan sen nimi ja harjoitusten
// lukumäärä
const Part =  ({part}) => (
  <p>{part.name} {part.exercises}</p>
)

// Moduuli tulostaa kurssin jokaisen osan omana kappaleena
// sekä laskee harjoitusten yhteismäärän
const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
    <Total parts={parts} />
  </div>
)

// Käyttää alikomponentteja otsikon ja kurssin sisällön
// tulostukseen
const Course = ({course}) => (<div>
    <Header header={course.name} />
    <Content parts={course.parts} />
  </div>
)

export default Course
