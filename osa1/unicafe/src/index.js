import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (<h1>{text}</h1>)

const Statistics = ({count, text}) => (<div>{text} {count}</div>)

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const welcomeHeader = "give feedback"
  const statisticsHeader = "statistics"

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header text={welcomeHeader}/>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Header text={statisticsHeader} />
      <Statistics count={good} text ='good' />
      <Statistics count={neutral} text ='neutral' />
      <Statistics count={bad} text ='bad' />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
