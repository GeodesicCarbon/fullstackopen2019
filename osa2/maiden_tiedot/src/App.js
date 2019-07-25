import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryData from './components/CountryData'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = !search
    ? []
    : countries.filter(country =>
        country.name.toLowerCase().includes(
          search.toLowerCase()
        )
      )

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const searchForm = {
    search,
    handleSearchChange
  }

  return (
    <CountryData
      searchForm={searchForm}
      countries={countriesToShow}
    />
  )
}

export default App;
