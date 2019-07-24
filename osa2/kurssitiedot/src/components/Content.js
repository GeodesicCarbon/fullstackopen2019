import React from 'react'
import Part from './Part'
import Total from './Total'

// Moduuli tulostaa kurssin jokaisen osan omana kappaleena
// sekä laskee harjoitusten yhteismäärän
const Content = ({parts}) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
    <Total parts={parts} />
  </div>
)

export default Content
