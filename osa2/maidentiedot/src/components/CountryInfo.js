const CountryInfo = ( {country, data} ) => {
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
          <p>Temperature {Math.round((data.main.temp-273.15)*100)/100}{'\u00b0'}C</p>
          <img className='photo' src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
          <p>Wind {data.wind.speed} m/s</p>
        </div>
      </div>
    )
  }

export default CountryInfo