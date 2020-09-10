import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ keyword, setKeyword ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(x => x.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value)
  }

  const filteredPersons = keyword ? persons.filter(x => x.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        keyword={keyword}
        handleKeywordChange={handleKeywordChange} 
      />
      <h2>add a new</h2>
      <PersonForm 
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson} 
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App