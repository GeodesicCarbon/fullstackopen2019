import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// Nappikomponentti
const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)

// näyttää valitun anekdootin äänimäärät
const VoteCount = ({votes, selected}) => (
  <div>has {votes[selected]} votes</div>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  // luodaan taulukko äänistä ja täytetään se nollilla
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  // nappien tekstejä
  const nextText = 'next anecdote'
  const voteText = 'vote'

  // valitaan yksi anekdooteista satunnaisesti, voi olla sama
  const handleNext = () => {
    const nextAnecdote = Math.floor(Math.random()*props.anecdotes.length)
    setSelected(nextAnecdote)
  }

  // lisätään yksi ääni valitulle anekdootille
  const handleVote = () => {
    const voteCopy = [...votes]
    voteCopy[selected] += 1
    setVotes(voteCopy)
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <VoteCount votes={votes} selected={selected} />
      <Button handleClick={handleVote} text={voteText} />
      <Button handleClick={handleNext} text={nextText} />
    </div>
  )
}

// anekdootteja
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'The programmer, like the poet, works only slightly removed from pure thought-stuff. He builds his castles in the air, from air, creating by exertion of the imagination. Few media of creation are so flexible, so easy to polish and rework, so readily capable of realizing grand conceptual structures. (This very tractability has its own problems.)',
  'Plan to throw one (implementation) away; you will, anyhow.',
  'Prolific programmers contribute to certain disaster. ',
  'Real programmers can write assembly code in any language. ',
  'For every complex problem there is an answer that is clear, simple, and wrong.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
