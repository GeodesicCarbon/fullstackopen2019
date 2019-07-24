import React from 'react'
import Header from './Header'
import Content from './Content'

// Käyttää alikomponentteja otsikon ja kurssin sisällön
// tulostukseen
const Course = ({course}) => (<div>
    <Header header={course.name} />
    <Content parts={course.parts} />
  </div>
)

export default Course
