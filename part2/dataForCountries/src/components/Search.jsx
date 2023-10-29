
const Search = ({ newSearch, handleNewSeach }) => {
    return (
        <div>
            find countries: <input value={newSearch} onChange={handleNewSeach} />
        </div>
    )
}

export default Search