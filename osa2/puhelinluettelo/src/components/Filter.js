const Filter = ( {newFilter, filterChange} ) => {
    return(
      <form>
        <div>
          Choose a filter: <input value={newFilter} onChange={filterChange}/>
        </div>
      </form>
    )
  }

export default Filter