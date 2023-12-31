import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const handleDelete = (id) => {
    const personToRemove = persons.find(person => person.id === id).name
    if (window.confirm(`Do you really want to remove ${personToRemove} from the Phonebook?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`${personToRemove} is removed from the phonebook.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${personToRemove}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const errorHandler = (error, id) => {
    if (error.response === undefined) {
      setErrorMessage(`Information of '${newName}' was already removed from server`)
      setNewName('')
      setNewNumber('')
      setPersons(persons.filter(person => person.id !== id))
    } else {
      setErrorMessage(error.response.data.error)
    }
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
      const updatePerson = persons.find(person => person.name === newPerson.name)
      if (updatePerson.number === newNumber) {
        setErrorMessage(`${updatePerson.name} is already in the phonebook.`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } else {
        if (window.confirm(`${updatePerson.name} is already in the Phonebook. Do you want to replace the old number with the new number?`)) {
          const uPerson = {
            name: updatePerson.name,
            number: newNumber,
            id: updatePerson.id
          }
          personService
            .update(updatePerson.id, uPerson)
            .then(returnedPerson => {
              setPersons(persons.filter(person => person.id !== returnedPerson.id).concat(returnedPerson))
              setNewName('')
              setNewNumber('')
              setMessage(`The number of ${updatePerson.name} is now updated.`)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
            })
            .catch(error => errorHandler(error, updatePerson.id))
        }
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newPerson.name} to the phonebook.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
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
      <Notification message={errorMessage} messageType='error' />
      <Notification message={message} messageType='confirm' />
      <PersonForm handlers={handlers} />
      <h2>Numbers</h2>
      <Person persons={persons} newSearch={newSearch} label="delete" deleteHandler={handleDelete} />
    </div>
  )
}

export default App