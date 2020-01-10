import axios from 'axios'
const baseUrl = '/api/users'

// haetaan kaikki käyttäjät palvelimelta
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return (response.data)
}

export default { getAll }
