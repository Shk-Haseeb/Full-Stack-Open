import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

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
            setNotification(`Updated number for ${updatedPerson.name}`)
            setNotificationType('success')
            setTimeout(() => setNotification(null), 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNotification(`Information of ${newName} has already been removed from server`)
            setNotificationType('error')
            setTimeout(() => setNotification(null), 5000)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }

    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Added ${returnedPerson.name}`)
          setNotificationType('success')
          setTimeout(() => setNotification(null), 5000)
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
        setNotification(`Deleted ${name}`)
        setNotificationType('success')
        setTimeout(() => setNotification(null), 5000)
      })
      .catch(() => {
        setNotification(`${name} was already deleted from the server`)
        setNotificationType('error')
        setTimeout(() => setNotification(null), 5000)
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

      <Notification message={notification} type={notificationType} />

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
