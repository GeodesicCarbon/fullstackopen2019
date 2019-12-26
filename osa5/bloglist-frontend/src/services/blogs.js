import axios from 'axios'
const baseUrl = '/api/blogs'

// käyttäjän tunniste
let token = null

// asetetaan uusi tunnite
const setToken = newToken => {
  token = `bearer ${newToken}`
}

// haetaan kaikki blogit palvelimelta
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return (response.data)
}

// lisätään uusi blogi palvelimelle
const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

// Päivitetään blogin tiedo
const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

export default { getAll, create, update, setToken }
