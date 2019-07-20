import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (<h1>{text}</h1>)

const Statistic = ({count, text}) => {
  // lisää prosenttimerkki tarvittaessa
  if (text === 'positive') {
    return (<div>{text} {count} %</div>)
  }
   return (<div>{text} {count}</div>)
}

const Statistics = ({votes}) => {
  const [good, neutral, bad] = votes
  const total = votes.reduce((a,b) => a+b,0)
  if (total === 0) {
    return (<div>No feedback given</div>)
  }
  const average = (good - bad)/total
  const positive = good/total*100
  return(
    <div>
      <Statistic count={good} text='good'/>
      <Statistic count={neutral} text='neutral'/>
      <Statistic count={bad} text='bad'/>
      <Statistic count={total} text='all'/>
      <Statistic count={average} text='average'/>
      <Statistic count={positive} text='positive'/>
    </div>
  )
}

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
      <Statistics votes={[good, neutral, bad]}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
