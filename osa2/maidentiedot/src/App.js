import { useState, useEffect } from 'react'
import countryService from './services/Countries'
import Filter from './components/Filter'
import CountryComponent from './components/CountryComponent'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [weatherData, setWeatherData] = useState(null)

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
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

  if (countries.length !== 0) {
    return (
      <div>
        <h2>Countries of the world</h2>
        <Filter newFilter={newFilter} filterChange={handleFilterChange}/>
        <CountryComponent lands={countries} filter={newFilter} setNewFilter={setNewFilter} weatherData={weatherData} setWeatherData={setWeatherData}/>
      </div>
    )
  }

}

export default App