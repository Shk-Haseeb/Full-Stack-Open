
const Header = (props) => {
  console.log(props.course.name)
  return (<h1>{props.course.name}</h1>)
}

const Part = ({name,amount}) => {
  console.log({name,amount})
  return (<p>{name} {amount}</p>)
}

const Content = (props) => {
  console.log(props.parts.parts[0])
  return (
    <div>
      <Part name={props.parts.parts[0].name} amount={props.parts.parts[0].exercises}/>
      <Part name={props.parts.parts[1].name} amount={props.parts.parts[1].exercises}/>
      <Part name={props.parts.parts[2].name} amount={props.parts.parts[2].exercises}/>
    </div>
  )
}


const Total = (props) => {
  console.log(props)
  return (<p>Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}</p>)
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
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

export default App