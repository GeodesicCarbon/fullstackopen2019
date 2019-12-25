import axios from 'axios'
const baseUrl = '/api/blogs'

// käyttäjän tunniste
let token = null

// asetetaan uusi tunnite
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, setToken }
