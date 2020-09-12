import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ keyword, setKeyword ] = useState('')
  const [ notification, setNotification ] = useState({message: '', type: ''})

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(x => x.name.toLowerCase() === newName.toLocaleLowerCase())
    if (existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = {
          ...existingPerson,
          number: newNumber
        }
        personService
          .updateOne(personToUpdate)
          .then(updatedPerson => {
            setPersons(persons.map(x => x.id === updatedPerson.id ? updatedPerson : x))
            setNewName('')
            setNewNumber('')
            const notification = {
              message: `Updated '${personToUpdate.name}'`,
              type: 'success'
            }
            handleNotification(notification)
          })
          .catch(error => {
            const notification = {
              message: `Person '${personToUpdate.name}' has already been removed from server`,
              type: 'error'
            }
            handleNotification(notification)
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .createOne(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          const notification = {
            message: `Added '${newPerson.name}'`,
            type: 'success'
          }
          handleNotification(notification)
        })
        .catch(error => {
          const notification = {
            message: `Person '${newPerson.name}' cannot be created`,
            type: 'error'
          }
          handleNotification(notification)
        })
    }
  }

  const deletePerson = (personToDelete) => {
    if(window.confirm(`Delete ${personToDelete.id}?`)) {
      personService
        .deleteOne(personToDelete.id)
        .then(() => {
          setPersons(persons.filter(x => x.id !== personToDelete.id))
          const notification = {
            message: `Deleted '${personToDelete.name}'`,
            type: 'success'
          }
          handleNotification(notification)
        }) 
        .catch(error => {
          const notification = {
            message: `Person '${personToDelete.name}' has already been removed from server`,
            type: 'error'
          }
          handleNotification(notification)
        })
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

  const handleNotification = (notification) => {
    console.log(notification.message)
    setNotification(notification)
    setTimeout(() => {
      setNotification({message: '', type: ''})
    }, 5000)
  }

  const filteredPersons = keyword ? persons.filter(x => x.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) : persons

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App