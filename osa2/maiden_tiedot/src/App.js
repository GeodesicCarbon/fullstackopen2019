import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryData from './components/CountryData'

const App = () => {
  // Tilamuuttujat etsintäkentälle, maille
  // sekä valitulle maatagille
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [countryTag, setCountryTag] = useState('')
  const [weather, setWeather] = useState({})

  // OpenWeather.org API avain
  const appID = ''

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

  // Jos maa on löydetty, aktivoidaan useEffect(getWeather)
  // ja haetaan pääkaupungin sää.
  const weatherLoadBlocker =
    countriesToShow.length === 1
    ? [true]
    : [false]

  // Säänhakufunktio
  const getWeather = () => {
    if (countriesToShow.length === 1) {
      const capital = countriesToShow[0].capital
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&APPID=${appID}`)
        .then(response => {
          setWeather(response.data)
        })
    } else {
    }
  }

  // Jos maa on valitty niin haetaan sää
  useEffect(getWeather, weatherLoadBlocker)

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
      weather={weather}
    />
  )
}

export default App;
