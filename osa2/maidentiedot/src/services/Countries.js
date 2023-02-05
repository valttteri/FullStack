import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/all'
const getOneUrl = 'https://restcountries.com/v3.1/name/united'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getSome = () => {
    const request = axios.get(getOneUrl)
    return request.then(response => response.data)
}

export default { getAll, getSome }