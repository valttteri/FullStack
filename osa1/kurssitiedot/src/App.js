const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  
  }  
  return (  
    <div>
      <Header course={course.name} />
      <Content course={course.parts} />
      <Total course={course.parts} />
    </div>
  )  
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>  
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.course[0].name} exercise={props.course[0].exercises} />
      <Part part={props.course[1].name} exercise={props.course[1].exercises} />
      <Part part={props.course[2].name} exercise={props.course[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercise}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {
          props.course[0].exercises+
          props.course[1].exercises+
          props.course[2].exercises
        }
      </p>
    </div>
  )
}

export default App