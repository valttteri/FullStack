import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ( {good, neutral, bad} ) => {
  const all = good + neutral + bad
  const average = all > 0 ? Math.round(((good-bad)/all) * 100)/100 : 0
  const positive = all > 0 ? Math.round((good/all) * 100)/100 : 0

  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={good}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positive + " %"}/>
      </tbody>
    </table>
  )
}

const StatisticLine = ( {text, value} ) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickedGood = () => setGood(good + 1)
  const clickedBad = () => setBad(bad + 1)
  const clickedNeutral = () => setNeutral(neutral + 1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={clickedGood} text="good"/>
      <Button handleClick={clickedNeutral} text="neutral"/>
      <Button handleClick={clickedBad} text="bad"/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
