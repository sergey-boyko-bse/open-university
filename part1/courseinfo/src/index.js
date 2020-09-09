import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
        {props.name} {props.exercises}
      </p>
  )
}

const Content = (props) => {
  return (
    props.parts.map((part, index) => 
      <Part key={index} name={part.name} exercises={part.exercises} />
      )
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {name: 'Fundamentals of React', exercises: 10},
    {name: 'Using props to pass data', exercises: 7},
    {name: 'State of a component', exercises: 14}
  ]
  const total = parts.reduce((a, b) => a + b.exercises, 0)

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={total} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))