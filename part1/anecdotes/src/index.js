import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const RandomAnecdote = ({anecdote, votes}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has votes {votes}</p>
    </div>
  )
}

const MostVotedAnecdote = ({anecdote}) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>     
    </div>
  )
}

const Button = ({text, clickHandler}) => {
  return (
  <button onClick={clickHandler}>{text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(props.anecdotes.map(x => 0))

  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  const voteClickHandler = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const nextClickHandler = () => {
    let next = selected
    do {
      next = getRandomInt(0, props.anecdotes.length)
    }
    while(next === selected)
    setSelected(next)
  }

  const mostVoted = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <RandomAnecdote anecdote={props.anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" clickHandler={voteClickHandler} />
      <Button text="next anecdote" clickHandler={nextClickHandler} />
      <MostVotedAnecdote anecdote={props.anecdotes[mostVoted]} />    
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)