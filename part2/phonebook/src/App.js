import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const addName = (event) => {
      event.preventDefault()

      if(!persons.find(person => person.name === newName)) {
          const newPerson = {
              name: newName
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
            <p>name: <input value={newName} onChange={handleNameChange} /></p>
          </div>
          <div>
            <button type="submit" onClick={addName}>add</button>
          </div>
        </form>

        <h2>Numbers</h2>
          {persons.map((person) => <p key={person.name}>{person.name}</p>)}
      </div>
  )
}

export default App