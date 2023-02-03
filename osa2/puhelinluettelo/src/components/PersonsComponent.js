const Persons = ( {persons, filter, deletePerson} ) => {
    var personsToRender = persons
    if (filter !== '') {
      personsToRender = persons.filter((person) => person.name.toLowerCase().substr(0, filter.length) === filter || person.name.substr(0, filter.length) === filter)
    }
    return (
      <div>
        {personsToRender.map(person => (
          <div key={person.name}>
            <p>{person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button></p>  
          </div>
        ))}
      </div>
    )  
  }

export default Persons