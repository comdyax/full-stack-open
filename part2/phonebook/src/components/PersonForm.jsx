const PersonForm = ({ handlers }) => {
    return (
        <>
            <form onSubmit={handlers.addPerson}>
                <div>
                    name: <input value={handlers.newName} onChange={handlers.handleNewName} />
                </div>
                <br></br>
                <div>
                    number: <input value={handlers.newNumber} onChange={handlers.handleNewNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm