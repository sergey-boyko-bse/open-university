import React from 'react'

const Header = ({course}) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>
        {name} {exercises}
      </p>
    )
  }
  
  const Content = ({course}) => {
    return (
      <div>
        {course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      </div>
    )
  }
  
  const Total = ({course}) => {
    const total = course.parts.reduce((a, b) => a + b.exercises, 0)
    return (
      <p className="bold">total of {total} exercises</p>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course