import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    {
        name: 'Arto Hellas',
        number: '123456'
    }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const addName = (event) => {
      event.preventDefault()

      if(!persons.find(person => person.name === newName)) {
          const newPerson = {
              name: newName,
              number: newNumber
          }
          setPersons(persons.concat(newPerson))
      }
      else {
          window.alert(`${newName} is already added`);
      }
  }

  return (
      <div>
        <h2>Phonebook</h2>

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
          {persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
  )
}

export default App