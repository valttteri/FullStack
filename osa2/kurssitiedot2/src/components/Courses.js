//prints an individual part of the course
const Part = ( {name, exercise} ) => {
    return (
      <div>
        <p>{name} {exercise}</p>
      </div>
    )
  }

//prints the contents of the course  
const Content = (props) => {
const parts = props.parts
return (
    <div>
    {parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises}/>)}
    </div>
)
}

//prints the name of the course
const Header = ( {name} ) => {
return (
    <div>
    <h1>{name}</h1>  
    </div>
)
}

//prints sum of the courses exercises
const Total = (props) => {
const parts = props.parts
var sum = 0
console.log(sum)
return (
    <div>
    <p>
        <strong>
        Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
        </strong>
    </p>
    </div>
)
}

const Course = (props) => {
return (
    <div>
    <Header name={props.course.name}/>
    <Content parts={props.course.parts}/>
    <Total parts={props.course.parts}/>
    </div>
)
}

export default Course