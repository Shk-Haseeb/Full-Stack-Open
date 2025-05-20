import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')
  const [countryToShow, setCountryToShow] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchText(event.target.value)
    setCountryToShow(null)
  }

  const showCountry = (country) => {
    setCountryToShow(country)
  }

  const countriesToDisplay = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div>
      <h1>Country Search</h1>

      <div>
        Search: <input value={searchText} onChange={handleSearchChange} />
      </div>

      <Result
        countries={countriesToDisplay}
        selected={countryToShow}
        onShow={showCountry}
      />
    </div>
  )
}

const Result = ({ countries, selected, onShow }) => {
  if (selected) {
    return <CountryInfo country={selected} />
  }

  if (countries.length > 10) {
    return <p>Too many results. Please make your search more specific.</p>
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(c => (
          <li key={c.cca3}>
            {c.name.common}{' '}
            <button onClick={() => onShow(c)}>show</button>
          </li>
        ))}
      </ul>
    )
  }

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  }

  return <p>No countries found.</p>
}

const CountryInfo = ({ country }) => {
  const languageList = country.languages
    ? Object.values(country.languages)
    : []

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area} km²</p>

      <h3>Languages:</h3>
      <ul>
        {languageList.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
    </div>
  )
}

export default App


//Missing Exercise 2.20
//Did Not Fetch Weather For Countries