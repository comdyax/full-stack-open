import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import Search from './components/Search'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [showed, setShowed] = useState(0)
  const [countriesNew, setCountriesNew] = useState([])

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])

  const handleNewSearch = (event) => {
    if(showed === 1) {
      setShowed(0)
      setCountries(countriesNew)
    }
    setNewSearch(event.target.value)
  }

  const handleShow = (country) => {
    setCountriesNew(countries)
    setCountries([country])
    setShowed(1)
  }

  const mainDiv = {
    width: '100%',
    margin: 'auto',
    border: '3px solid black',
    padding: '10px',
    lineHeight: '1.5'

  }

  return (
    <div style={mainDiv}>
      <h1>Data for Countries</h1>
      <Search newSearch={newSearch} handleNewSeach={handleNewSearch} />
      <Countries countries={countries} newSearch={newSearch} showHandler={handleShow} />
    </div>
  )
}

export default App
