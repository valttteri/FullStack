import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/all'
const apiKey = process.env.REACT_APP_API_KEY

const getWeather = (cityName) => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, getWeather }