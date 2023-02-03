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

export default PersonForm