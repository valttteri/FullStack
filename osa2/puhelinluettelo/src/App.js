import { useState } from 'react'

const Name = ( {person, filter} ) => { 
  const nameLowerCase = person.name.toLowerCase()

  if (filter === '') {
  return(
    <p>{person.name} {person.number}</p>
  )
  } else {
    if (nameLowerCase.substr(0, filter.length) === filter || person.name.substr(0, filter.length) === filter) {
      return(
        <p>{person.name} {person.number}</p>
      )  
    }
  }
}

const Persons = ( {persons, filter} ) => {
  return (
    <div>
      {persons.map(person =>
        <Name key={person.name} person={person} filter={filter}/>
      )}
    </div>
  )  
}

const PersonForm = ( {addPerson, newName, nameChange, newNumber, numberChange} ) => {

  return (
    <form onSubmit={addPerson}>
      <div>
        <h3>Add a new contact</h3>
        Name: <input value={newName} onChange={nameChange}/><br/>
        Number: <input value={newNumber} onChange={numberChange}/><br/>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ( {newFilter, filterChange} ) => {
  return(
    <form>
      <div>
        Choose a filter: <input value={newFilter} onChange={filterChange}/>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  //adds a new person to the array 'persons'
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
  
    const namesOfPeople = persons.map(person => person.name)

    //check if the person already exists in the phonebook
    if (namesOfPeople.includes(personObject.name)) {
      alert(`${personObject.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  //saves the name given by user
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  //saves the number given by user
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  //saves the filter given by user
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    console.log(newFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newFilter={newFilter} filterChange={handleFilterChange}/>
        <PersonForm addPerson={addPerson} newName={newName} nameChange={handleNameChange}
        newNumber={newNumber} numberChange={handleNumberChange}/>
      <h3>Numbers</h3>
        <Persons persons={persons} filter={newFilter}/>
    </div>
  )
}


export default App