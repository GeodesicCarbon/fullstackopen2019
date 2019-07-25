import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryData from './components/CountryData'

const App = () => {
  // Tilamuuttujat etsintäkentälle, maille
  // sekä valitulle maatagille
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [countryTag, setCountryTag] = useState('')

  // Haetaan maiden tiedot REST-apin kautta ja tallennetann
  // ne tilamuuttujaan
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // funktio, joka vastaa kaikkien maiden filtteröinnistä
  const selectCountriesToShow = () => {
    // jos maatagi-tilamuuttujassa on sisältöä,
    // näytetään vain se maa
    if (countryTag)
      return (
        countries.filter(country =>
          country.alpha3Code === countryTag
        )
      )
    // muutoin muutetaan kaikki nimet pieniin kirjaimiin
    // ja suodatetaan
    else
      return (
        !search
          ? []
          : countries.filter(country =>
              country.name.toLowerCase().includes(
                search.toLowerCase()
              )
            )
      )
  }

  // kutsutaan maiden filtteröintifunktiota ja tallenetaan
  // tulos
  const countriesToShow = selectCountriesToShow()

  // funktio, joka vastaa etsintäkentä tilamuuttujasta
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setCountryTag('')
  }

  // funktio, joka vastaa maalistauksen "show"-napin
  // matagin tallentamisesta tilamuuttujaan
  const selectCountry = (alpha3Code) => {
    setCountryTag(alpha3Code)
  }

  // kootaan etsintäkentälle tarvittavat objektit yhteen
  const searchForm = {
    search,
    handleSearchChange,
    selectCountry
  }

  return (
    <CountryData
      searchForm={searchForm}
      countries={countriesToShow}
    />
  )
}

export default App;
