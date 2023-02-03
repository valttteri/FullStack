import { useState, useEffect } from 'react'
import personService from './services/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import Persons from './components/PersonsComponent'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(null)
 
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
      //update a persons number
      const existingPerson = persons.find(person => person.name === personObject.name)
      personService
        .update(existingPerson.id, personObject)
        .then(response => {
          setPersons(persons.map(person => person.id !== response.id ? person : response))
          setErrorType('positive')
          setErrorMessage(`Number of ${personObject.name} updated`)
        })
        .catch(error => {
          setErrorType('negative')
          setErrorMessage(`${personObject.name} was already deleted from phonebook`)
        })

    } else {
      //add a new person
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setErrorType('positive')
          setErrorMessage(`${personObject.name} added to phonebook`)
        })
    }

    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setErrorMessage(null)
      setErrorType(null)
    }, 4000)
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

  //delete a person
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(response => {
        const filteredPersons = persons.filter(person => person.id !== id)
        setPersons(filteredPersons)
        setErrorMessage(`${name} deleted from phonebook`)
        setErrorType('positive')
      })
      .catch(error => {
        setErrorType('negative')
        setErrorMessage(`${name} was already deleted from phonebook`)
      })

      setTimeout(() => {
        setErrorMessage(null)
        setErrorType(null)
      }, 4000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={errorMessage} type={errorType}/>
        <Filter newFilter={newFilter} filterChange={handleFilterChange}/>
        <PersonForm addPerson={addPerson} newName={newName} nameChange={handleNameChange}
        newNumber={newNumber} numberChange={handleNumberChange}/>
      <h3>Numbers</h3>
        <Persons persons={persons} filter={newFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App