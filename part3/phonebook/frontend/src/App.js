import React, {useEffect, useState} from 'react'

import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import PersonList from "./components/PersonList";
import Notification from "./components/Notification";
import personService from "./services/persons"

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');
  const [ notification, setNotification] =
    useState({
      message: '',
      isError: false
    })

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  };
  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  };
  const handleFilter = (event) => {
      setSearchName(event.target.value)
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    let newPerson = persons.find(person => person.name === newName)

    if(!newPerson) {
      newPerson = {
          name: newName,
          number: newNumber
        };

      personService.create(newPerson)
        .then(data => {
          setPersons(persons.concat(data));
          setSearchName('');
          setNotification({
            message: `${newName} has been added`,
            isError: false
          })
        })
        .catch(err => {
          setNotification({
            message: err.response.data.message,
            isError: true
          })
        })
    }
    else {
      if(window.confirm(`${newName} is already added, replace the old number with the new one?`)) {
        newPerson.number = newNumber
        personService.update(newPerson)
          .then(data => {
            setPersons(persons.map(p => p.id === data.id ? data : p));
            setSearchName('');
            setNotification({
              message: `${newName}'s number has been updated`,
              isError: false
            })
          })
          .catch(err => {
            setNotification({
              message: err.response.data.message,
              isError: true
            })
          })
      }
    }

    setTimeout(() => {
      setNotification({
        message: '',
        isError: false
      })
    }, 5000)
  };

  const handlePersonDelete = (deletePerson) => {
    const confirm = window.confirm(`Delete ${deletePerson.name}?`)
    if(confirm) {
      personService.remove(deletePerson)
        .then(data => {
          setPersons(persons.filter(p => p.id !== deletePerson.id))
          setSearchName('')
          setNotification({
            message: `${deletePerson.name} has been deleted`,
            isError: false
          })
        })
        .catch(err => {
          setNotification({
            message: `${deletePerson.name} has already been deleted from the server. Please refresh the browser`,
            isError: true
          })
        })

      setTimeout(() => {
        setNotification({
          message: '',
          isError: false
        })
      }, 5000)
    }
  }

  useEffect(() => {
    personService.getAll()
      .then(allPersons => setPersons(allPersons))
  }, []);

  const personsFiltered = searchName
    ? persons.filter(p => p.name.search(new RegExp(`.*${searchName}.*`, 'ig')) !== -1)
    : persons;

  return (
      <div>
        <h1>Phonebook</h1>

        <Filter searchName={searchName} handleFilter={handleFilter}/>

        <h2>Add new</h2>
        <PersonForm
          onSubmit={handleFormSubmit}
          name={newName}
          number={newNumber}
          handleName={handleNameChange}
          handleNumber={handleNumberChange}
        />

        <h2>Numbers</h2>

        <PersonList
          persons={personsFiltered}
          handlePersonDelete={handlePersonDelete}
        />

        <Notification notification={notification} />

      </div>
  )
};

export default App