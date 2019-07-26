import React from 'react'

// Etsintäkentä komponentti
const SearchForm = ({searchForm}) => (
  <div>
    Find countries: <input
                      value={searchForm.search}
                      onChange={searchForm.handleSearchChange}
                    />
  </div>
)

// tekee taulukon hakua vastaavista maiden nimistä ja
// ja napista, jolla voi maasta nähtä yksityiskohtia
const ListCountries = ({countries, selectCountry}) => (
    <table>
      <tbody>
        {countries.map(country =>
          <tr key={country.alpha3Code}>
            <td>{country.name}</td>
            <td><button onClick={
              () => selectCountry(country.alpha3Code)}>
              show
            </button></td>
          </tr>)}
      </tbody>
    </table>
)

// Sään näyttävä komponentti. Jos weather-objekti ei sisällä
// tarvittavat tiedot niin ei näytetä mitään.
const Weather = ({weather}) => {
  if ( typeof weather.weather === 'undefined') {
    return (<div></div>)
  } else {
    return(
      <div>
        <h2>Weather in {weather.name}</h2>
        <h3>{weather.weather[0].main}</h3>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}/>
        <div><b>Temperature:</b> {weather.main.temp} Celsius</div>
        <div><b>Humidity:</b> {weather.main.humidity} %</div>
        <div><b>Pressure:</b> {weather.main.pressure} hPa</div>
        <div><b>Wind:</b> {weather.wind.speed} m/s {weather.wind.deg} degrees</div>
      </div>
    )
  }

}
// komponentti, joka näyttää maan yksityiskohtia
const ShowCountry = ({countries}) => {
  const country = countries[0]

  // pienennetään lipun kooksi 30% ruudun koosta
  const imgStyle = {
    width: '30%',
    height: '30%'
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital} </div>
      <div>Population: {country.population} </div>
      <h2>Languages:</h2>
      <ul>
        {country.languages.map(lang =>
          <li key={lang.iso639_2}>{lang.name}</li>
        )}
      </ul>
      <img style={imgStyle} src={country.flag} alt={country.name + " flag"}/>
    </div>
  )
}

// komponentti, joka vastaa maiden tietojen listauksesta
// sekä nayttämisestä
const CountryData = ({searchForm, countries, weather}) => {
  // jos tuloksia ei ole niin näytetän kehote
  if (countries.length === 0) return (
    <div>
      <SearchForm searchForm={searchForm} />
      <div>Use the search form to begin</div>
    </div>
  )
  // jos tuloksia on yli 10 niin pyydetään tarkentamaan
  if (countries.length > 10) return (
      <div>
        <SearchForm searchForm={searchForm} />
        <div>Too many matches, specify another filter</div>
      </div>
    )
  // jos tuloksia on 2-10 niin listataan ne
  else if (countries.length === 1) return (
      <div>
        <SearchForm searchForm={searchForm} />
        <ShowCountry countries={countries} />
        <Weather weather={weather} />
      </div>
    )
  // muussa tapauksessa (tuloksia = 1) näytetän
  // maan tiedot
  else return (
    <div>
      <SearchForm searchForm={searchForm} />
      <ListCountries
        countries={countries}
        selectCountry={searchForm.selectCountry}
        weather={weather}
      />
    </div>
  )
}

export default CountryData
