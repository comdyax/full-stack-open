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
            <button onClick={() => showHandler(country)}>save</button>
        </li>
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

export default Countries