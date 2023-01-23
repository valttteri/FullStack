import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const MostVoted = ( {anecdotes, votes} ) => {
  var maxIndex = -1
  var maxVotes = 0

  for (var i = 0; i < votes.length; i++) {
    if (votes[i] > maxVotes) {
      maxIndex = i
      maxVotes = votes[i]
    }
  }

  if (maxVotes > 0) {
    return (
      <div>
        <p>{anecdotes[maxIndex]}</p>
        <p>has {maxVotes} votes</p>
      </div>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const clickNewAnecdote = () => {
    const randomInteger = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomInteger)
  }

  const clickVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }

  return (
    <div>
      <h1><strong>Anecdote of the day</strong></h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={clickNewAnecdote} text="new anecdote"/>
      <Button handleClick={clickVote} text="vote"/>
      <h1><strong>Anecdote with most votes</strong></h1>
      <MostVoted anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App
