import { useState, useEffect } from 'react'
import countryService from './services/Countries'

const Filter = ( {newFilter, filterChange} ) => {
  return(
    <form>
      <div>
        Search by country name: <input value={newFilter} onChange={filterChange}/>
      </div>
    </form>
  )
}


const CountryInfo = ( {country} ) => {
  console.log(country)
  const languageList = Object.entries(country.languages)
  .map( ([key, value]) => <li key={key}>{value}</li>)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
      </div>
      <h3>Languages:</h3>
      <div>
        <ul>{languageList}</ul>
      </div>
      <div>
        <img className='photo' src={country.flags['png']}/>
      </div>
      <div>
        <h3>Weather in {country.capital}:</h3>
      </div>
    </div>
  )
}

const Countries = ( {lands, filter, setNewFilter} ) => {
   
  if (filter.length !== 0) {
    var landsToRender = lands.filter((land) => land.name.common.toLowerCase().includes(filter) || land.name.common.includes(filter))
    if (landsToRender.length === 1) {
      return (
        <div>
          <CountryInfo country={landsToRender[0]}/>
        </div>
      )
    } else if (landsToRender.length > 0 && landsToRender.length <= 10) {
      return (
        <div>
          {landsToRender.map(land => (
            <div key={land.name.common}>
              <p>{land.name.common} <button onClick={() => setNewFilter(land.name.common)}>show</button></p>
            </div>
          ))}
        </div>
      )
    } else if (landsToRender.length > 10) {
      return (
        <p>Too many results, please specify</p>
      )
    }
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    console.log(event.target.value)
  }

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        const lands = response
        lands.sort((a,b) => (a.name.common > b.name.common) ? 1 : ((b.name.common > a.name.common) ? -1 : 0))
        setCountries(lands)
      })
  }, [])
  //console.log(countries)

  const showCountry = country => {
    return (
      <CountryInfo country={country}/>
    )
  }

  if (countries.length !== 0) {
    return (
      <div>
        <h2>Countries of the world</h2>
        <Filter newFilter={newFilter} filterChange={handleFilterChange}/>
        <Countries lands={countries} filter={newFilter} setNewFilter={setNewFilter}/>
      </div>
    )
  }

}

export default App