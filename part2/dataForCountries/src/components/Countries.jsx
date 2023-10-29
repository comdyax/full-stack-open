import axios from 'axios'
import { useState } from 'react'

const Countries = ({ countries, newSearch, showHandler }) => {
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
                            country={country}
                            showHandler={showHandler}
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

const SingleCountry = ({ country, showHandler }) => {
    return (
        <li>
            {country.name.common} &emsp;
            <button onClick={() => showHandler(country)}>show</button>
        </li>
    )
}

const DetailCountry = ({ country }) => {
    const languages = Object.values(country.languages)
    const flagSize = {
        fontSize: '150px',
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
            <div style={flagSize}>
                {country.flag}
            </div>
            <ShowWeather country={country} />
        </div>
    )
}

const ShowWeather = ({ country }) => {
    const [isFetched, setIsFetched] = useState(false)
    const [weather, setWeather] = useState()
    const latitude = country.latlng[0]
    const longitude = country.latlng[1]
    if (!isFetched) {
        axios
            .get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,windspeed_10m`)
            .then(response => {
                setWeather(response.data)
                setIsFetched(true)
            })
    }
    if(!isFetched) {
        return (
            <>
            Weather is still Loading...
            </>
        )
    }else {
        return (
            <>
                <h2>Weather in {country.name.common}</h2>
                <p>
                    temperature: {weather.current.temperature_2m} {weather.current_units.temperature_2m}
                </p>
                <p>
                    wind: {weather.current.windspeed_10m} {weather.current_units.windspeed_10m}
                </p>
            </>
        )
    }
}

export default Countries