import React from 'react'

// Poimii harjoitustus lukumäärän kurssiobjektista ja
// laskee niiden summan
const Total = ({parts}) => (
  <p><b>Total of {parts.map(part=>part.exercises).reduce((a,b) => a + b,0)} exercises </b></p>
)

export default Total
