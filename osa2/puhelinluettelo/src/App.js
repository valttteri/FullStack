import { useState, useEffect } from 'react'
import personService from './services/Persons'

const Persons = ( {persons, filter} ) => {

  if (filter === '') {
    return (
      <div>
        {persons.map(person => (
          <div key={person.name}>
            <p>{person.name} {person.number} <button>delete</button></p>  
          </div>
        ))}
      </div>
    )  
  } else {
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().substr(0, filter.length) === filter)
    return (
      <div>
        {filteredPersons.map(person => (
          <div key={person.name}>
            <p>{person.name} {person.number} <button>delete</button></p>  
          </div>
        ))}
      </div>
    )
  }
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

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log(`render ${persons.length} notes`)

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
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
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