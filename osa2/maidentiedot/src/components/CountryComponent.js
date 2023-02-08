import countryService from '../services/Countries'
import CountryInfo from './CountryInfo'

const CountryComponent = ( {lands, filter, setNewFilter, weatherData, setWeatherData} ) => {
    if (filter.length !== 0) {
      var landsToRender = lands.filter((land) => land.name.common.toLowerCase().includes(filter) || land.name.common.includes(filter))
      if (landsToRender.length === 1) {
        countryService.getWeather(landsToRender[0].name.common).then(response => setWeatherData(response))
        if (weatherData) {
          return (
            <div>
              <CountryInfo country={landsToRender[0]} data={weatherData}/>
            </div>
          )
        }
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

export default CountryComponent