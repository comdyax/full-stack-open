import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setVotes] = useState(Array(anecdotes.length).fill(0))

  const fillVotes = () => {
    const tmp = [...points]
    tmp[selected] += 1
    setVotes(tmp)
  }

  const selectRandomAnecdote = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length)
    console.log('old selected', selected)
    console.log('new selected', newSelected)
    setSelected(newSelected)
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <ShowAnec anecdote={anecdotes[selected]} />
      <ShowVotes votes={points[selected]} />
      <p>
        <Button clickHandler={fillVotes} text='vote' />
        <span> </span>
        <Button clickHandler={selectRandomAnecdote} text='show next anecdote' />
      </p>
      <Header text='Anecdote with most votes' />
      <BestAnec points={points} anecdotes={anecdotes} />

    </div>
  )
}

const ShowAnec = (props) => <div>{props.anecdote}</div>

const ShowVotes = (props) => <div>has {props.votes} votes</div>

const Button = ({ clickHandler, text }) => <button onClick={clickHandler}>{text}</button>

const Header = (props) => <h1>{props.text}</h1>

const BestAnec = ({ points, anecdotes }) => {
  let max = 0
  for (let i = 0; i < anecdotes.length; i++) {
    if (points[max] <= points[i]) {
      max = i
    }
  }
  return (
    <div>
      {anecdotes[max]}
      <ShowVotes votes={points[max]} />
    </div>
  )
}

export default App