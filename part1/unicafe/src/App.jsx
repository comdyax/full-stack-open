import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: bad + neutral + good,
    average: ((good - bad) / (good + neutral + bad)).toFixed(1),
    positive: (good / (good + neutral + bad) * 100).toFixed(1)
  }

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)

  return (
    <div>
      <Header header='give feedback' />
      <Button handleClick={handleClickGood} text='good' />
      <span> </span>
      <Button handleClick={handleClickNeutral} text='neutral' />
      <span> </span>
      <Button handleClick={handleClickBad} text='bad' />
      <Header header='statistics' />
      <Statistics statistics={statistics} />
    </div>
  )
}

const Header = ({ header }) => <h1>{header}</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Statistics = (props) => {
  const statistics = props.statistics
  if (statistics.all != 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={statistics.good} />
          <StatisticLine text='neutral' value={statistics.neutral} />
          <StatisticLine text='bad' value={statistics.bad} />
          <StatisticLine text='all' value={statistics.all} />
          <StatisticLine text='average' value={statistics.average} />
          <StatisticLine text='positive' value={statistics.positive} unit='%' />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      No feedback given.
    </div>
  )
}

const StatisticLine = ({ text, value, unit }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {unit}</td>
    </tr>
  )
}

export default App