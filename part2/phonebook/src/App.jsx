import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const hook = () => {
    axios
      .get("http://localhost:3001/persons")
      .then(response =>
        setPersons(response.data)
      )
  }

  useEffect(hook, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const arr = persons.map(person => person.name)
    if (arr.includes(newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handlers = {
    newName: newName,
    newNumber: newNumber,
    addPerson: addPerson,
    handleNewName: handleNewName,
    handleNewNumber: handleNewNumber
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />
      <h2>add a new Person</h2>
      <PersonForm handlers={handlers} />
      <h2>Numbers</h2>
      <Person persons={persons} newSearch={newSearch} />
    </div>
  )
}

export default App