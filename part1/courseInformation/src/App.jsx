
const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  const arr = props.course.parts
  return (
    <>
      <Part part={arr[0].name} exerciseNumber={arr[0].exercises} />
      <Part part={arr[1].name} exerciseNumber={arr[1].exercises} />
      <Part part={arr[2].name} exerciseNumber={arr[2].exercises} />
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exerciseNumber}
      </p>
    </>
  )
}

const Total = (props) => {
  const arr = props.course.parts
  return (
    <>
      <p>Number of exercises {arr[0].exercises + arr[1].exercises + arr[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App