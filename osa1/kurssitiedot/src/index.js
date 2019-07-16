import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  // palauta kurssin nimi h1-tagilla
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
}

const Part = (props) => {
  // palauta osan nimi ja tehtävien määrä <p>-tagilla
  return(
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
    </div>
  );
}


const Total = (props) => {
  // poimi tehtävälista-objektista tehtävien määrä per osa ja laske ne yhteen
  const total = Object.keys(props.course.parts).map(key => props.course.parts[key].exercises).reduce((a,b) => a + b,0);
  // palauta tehtävien määrä
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }


  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
