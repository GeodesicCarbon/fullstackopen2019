import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  // palauta kurssin nimi h1-tagilla
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
}

const Part = (props) => {
  // palauta osan nimi ja tehtävien määrä <p>-tagilla
  return(
    <div>
      <p>{props.part.partname} {props.part.partcount}</p>
    </div>
  )
}
const Content = (props) => {
  // luo taulukko tehtävien nimistä ja niiden määristä
  const items = [];
  for (const key in props.exercises_list) {
    items.push({partname: key, partcount: props.exercises_list[key]});
  }
  return (
    <div>
      <Part part={items[0]} />
      <Part part={items[1]} />
      <Part part={items[2]} />
    </div>
  );
}


const Total = (props) => {
  // poimi tehtävälista-objektista tehtävien määrä per osa ja laske ne yhteen
  const total = Object.keys(props.exercises_list).map(key => props.exercises_list[key]).reduce((a,b) => a + b,0);
  // palauta tehtävien määrä
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

const App = () => {
  // const-määrittelyt
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  // tehtävälista-objekti
  const exercises_list = {};
  exercises_list[part1] = exercises1;
  exercises_list[part2] = exercises2;
  exercises_list[part3] = exercises3;

  return (
    <div>
      <Header course={course} />
      <Content exercises_list={exercises_list} />
      <Total exercises_list={exercises_list} />
    </div>
  )
}

// const App = () => {
//   const part1 = 'Fundamentals of React'
//   const exercises1 = 10
//   const part2 = 'Using props to pass data'
//   const exercises2 = 7
//   const part3 = 'State of a component'
//   const exercises3 = 14
//
//   return (
//     <div>
//       <h1>{course}</h1>
//       <p>
//         {part1} {exercises1}
//       </p>
//       <p>
//         {part2} {exercises2}
//       </p>
//       <p>
//         {part3} {exercises3}
//       </p>
//       <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
//     </div>
//   )
// }

ReactDOM.render(<App />, document.getElementById('root'));
