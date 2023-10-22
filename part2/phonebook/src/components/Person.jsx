const Person = ({ persons, newSearch }) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    return (
        <ul>
            {personsToShow.map(person =>
                <SinglePerson key={person.id} name={person.name} number={person.number} />)}
        </ul>
    )
}

const SinglePerson = ({ name, number }) => <li>{name} &emsp; {number}</li>

export default Person