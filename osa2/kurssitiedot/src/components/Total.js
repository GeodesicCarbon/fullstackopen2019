import React from 'react'

const Total = ({exercises}) => (
  <p><b>Total of {exercises.reduce((a,b) => a + b,0)} exercises </b></p>
)

export default Total
