import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createPost = async blogObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const likePost = async (blogObject) => {
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
  return response.data
}

const removePost = async id => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, createPost, likePost, removePost }