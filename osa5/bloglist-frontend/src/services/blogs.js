import axios from 'axios'
const baseUrl = '/api/blogs'

// käyttäjän tunniste
let token = null

// asetetaan uusi tunnite
const setToken = newToken => {
  token = `bearer ${newToken}`
}

// haetaan kaikki blogit palvelimelta
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// lisätään uusi blogi palvelimelle
const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, create, setToken }
