import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
      setSearchName(event.target.value)
  }

  const addName = (event) => {
      event.preventDefault()

      if(!persons.find(person => person.name === newName)) {
          const newPerson = {
              name: newName,
              number: newNumber
          }
          setPersons(persons.concat(newPerson))
          setSearchName('');
      }
      else {
          window.alert(`${newName} is already added`);
      }
  }

  const personFilter = searchName
    ? persons.filter(p => p.name.search(new RegExp(`.*${searchName}.*`, 'ig')) !== -1)
    : persons

  return (
      <div>
        <h1>Phonebook</h1>
        <p>Filter: <input value={searchName} onChange={handleFilter}/></p>

        <h2>Add new</h2>
        <form>
          <div>
              <p>Name: <input value={newName} onChange={handleNameChange} /></p>
              <p>Number: <input value={newNumber} onChange={handleNumberChange} /></p>
          </div>
              <div>
            <button type="submit" onClick={addName}>add</button>
          </div>
        </form>

        <h2>Numbers</h2>
          {personFilter.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
  )
}

export default App