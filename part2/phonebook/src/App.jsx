import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleAddPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    const newPerson = { name: newName, number: newNumber }

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        personService
          .update(existingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : updatedPerson
            ))
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            alert(`The person '${newName}' was already removed from the server.`)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }

    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDeletePerson = (id, name) => {
    const confirm = window.confirm(`Delete ${name}?`)
    if (!confirm) return

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(() => {
        alert(`${name} was already deleted from server`)
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleNameInput = (event) => setNewName(event.target.value)
  const handleNumberInput = (event) => setNewNumber(event.target.value)
  const handleSearchInput = (event) => setSearchText(event.target.value)

  const visiblePersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchText={searchText} handleSearchInput={handleSearchInput} />

      <h3>Add a new</h3>

      <PersonForm
        handleSubmit={handleAddPerson}
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />

      <h3>Numbers</h3>

      <Persons people={visiblePersons} handleDelete={handleDeletePerson} />
    </div>
  )
}

export default App
