// tuodaan tarvittavat riippuvuudet
import axios from 'axios'

// lokaalin tietokannan osoite
const baseUrl = 'http://localhost:3001/anecdotes'

// alustetaan anekdoottilista hakemalla tietokannasta
const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

// luodaan uusi anekdootti tietokantaan
const createNew = async (content) => {
  const object = { content, votes: 0 }
  const res = await axios.post(baseUrl, object)
  return res.data
}

// päivitetään anekdootti tietokannassa
const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject)
  return res.data
}

export default { getAll, createNew, update }
