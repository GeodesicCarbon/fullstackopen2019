import React from 'react'

const SearchForm = ({searchForm}) => (
  <div>
    Find countries: <input
                      value={searchForm.search}
                      onChange={searchForm.handleSearchChange}
                    />
  </div>
)

const ListCountries = ({countries}) => (
    <table>
      <tbody>
        {countries.map(country => <tr key={country.alpha3Code}><td>{country.name}</td></tr>)}
      </tbody>
    </table>
)

const ShowCountry = ({countries}) => {
  const country = countries[0]

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

const CountryData = ({searchForm, countries}) => {
  if (countries.length === 0) return (
    <div>
      <SearchForm searchForm={searchForm} />
      <div>Use the search form to begin</div>
    </div>
  )
  if (countries.length > 10) return (
      <div>
        <SearchForm searchForm={searchForm} />
        <div>Too many matches, specify another filter</div>
      </div>
    )
  else if (countries.length === 1) return (
      <div>
        <SearchForm searchForm={searchForm} />
        <ShowCountry countries={countries} />
      </div>
    )
  else return (
    <div>
      <SearchForm searchForm={searchForm} />
      <ListCountries countries={countries} />
    </div>
  )
}

export default CountryData
