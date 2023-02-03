import { useState, useEffect } from 'react'
import personService from './services/Persons'

const Persons = ( {persons, filter, deletePerson} ) => {
  //instance where no filter is applied
  if (filter === '') {
    return (
      <div>
        {persons.map(person => (
          <div key={person.name}>
            <p>{person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button></p>  
          </div>
        ))}
      </div>
    )  
  } else {
    //instance where filter is applied
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().substr(0, filter.length) === filter)
    return (
      <div>
        {filteredPersons.map(person => (
          <div key={person.name}>
            <p>{person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button></p>  
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

  //render initial contacts
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  //adds a new person to the array 'persons'
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
  
    const namesOfPeople = persons.map(person => person.name)

    //check if the person already exists in the phonebook
    if (namesOfPeople.includes(personObject.name) && (window.confirm(`${personObject.name} is already in the phonebook. Replace number?`))) {
      const existingPerson = persons.find(person => person.name === personObject.name)
      personService
        .update(existingPerson.id, personObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== response.id ? person : response))
      })
    } else {
      //add a new person
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
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(response => {
        const filteredPersons = persons.filter(person => person.id !== id)
        setPersons(filteredPersons)
      })
    }
      
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newFilter={newFilter} filterChange={handleFilterChange}/>
        <PersonForm addPerson={addPerson} newName={newName} nameChange={handleNameChange}
        newNumber={newNumber} numberChange={handleNumberChange}/>
      <h3>Numbers</h3>
        <Persons persons={persons} filter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App

/*
{
  "persons":[
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]
}
*/