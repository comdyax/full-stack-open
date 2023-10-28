import { useState, useEffect } from 'react'
import countryService from './services/countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries =>
        setCountries(allCountries)
      )
  }, [])


  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const mainDiv = {
    width: '22%',
    margin: 'auto',
    border: '3px solid black',
    padding: '10px'
  }


  return (
    <div style={mainDiv}>
      <h1>Data for Countries</h1>
      <Search newSearch={newSearch} handleNewSeach={handleNewSearch} />
      <Countries countries={countries} newSearch={newSearch} />

    </div>
  )
}

const Search = ({ newSearch, handleNewSeach }) => {
  return (
    <div>
      find countries: <input value={newSearch} onChange={handleNewSeach} />
    </div>
  )
}

const Countries = ({ countries, newSearch }) => {
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(newSearch.toLowerCase()) || country.name.official.includes(newSearch.toLowerCase())
  )
  if (filteredCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, please specify your search.</p>
      </div>
    )
  }
  if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <div>
        <ul>
          {filteredCountries.map(country =>
            <SingleCountry
              key={country.name.official}
              country={country.name.common}
            />
          )}
        </ul>
      </div>
    )
  }
  if (filteredCountries.length === 1) {
    return (
      <DetailCountry country={filteredCountries[0]} />
    )
  }
}

const SingleCountry = ({ country }) => {
  return (
    <li>{country}</li>
  )
}

const DetailCountry = ({ country }) => {
  const languages = Object.values(country.languages)
  const flagSize = {
    fontSize: '250px',
    padding: '10%'
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      capital: {country.capital}
      <br></br>
      area: {country.area}
      <h2>Languages:</h2>
      <ul>
        {languages.map(la =>
          <li key={la}>{la}</li>)}
      </ul>
      <span style={flagSize}>
        {country.flag}
      </span>
    </div>
  )
}



export default App
