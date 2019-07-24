import React from 'react'

// Kurssin osasta tulostetaan sen nimi ja harjoitusten
// lukumäärä
const Part =  ({part}) => (
  <p>{part.name} {part.exercises}</p>
)

export default Part
