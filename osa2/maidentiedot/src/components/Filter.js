const Filter = ( {newFilter, filterChange} ) => {
    return(
      <form>
        <div>
          Search by country name: <input value={newFilter} onChange={filterChange}/>
        </div>
      </form>
    )
  }

export default Filter