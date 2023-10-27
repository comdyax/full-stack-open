const Person = ({ persons, newSearch, label, deleteHandler }) => {
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    return (
        <ul>
            {personsToShow.map(person =>
                <SinglePerson
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    number={person.number}
                    label={label}
                    deleteHandler={deleteHandler}
                />)}
        </ul>
    )
}

const SinglePerson = ({ id, name, number, label, deleteHandler }) => {
    return (
        <li>{name} &emsp; {number} &emsp;
            <button onClick={() => deleteHandler(id)}>{label}</button>
        </li>
    )
}

export default Person