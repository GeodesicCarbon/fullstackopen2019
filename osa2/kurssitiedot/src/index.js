import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

const App = () => {
  // Objekti, joka sisältää kurssin nimi, sen osat ja
  // niiden laajuudet
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  // Käytetään Course-komponenttia kaiken tulostukseen
  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
