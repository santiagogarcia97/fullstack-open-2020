import React, {useEffect, useState} from 'react'

import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import PersonList from "./components/PersonList";
import personService from "./services/persons"

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');

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

      if(!persons.find(person => person.name === newName)) {
          const newPerson = {
              name: newName,
              number: newNumber
          };

          personService.create(newPerson)
            .then(allPersons => {
              setPersons(persons.concat(allPersons));
              setSearchName('');
            })
      }
      else {
          window.alert(`${newName} is already added`);
      }
  };

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

        <PersonList persons={personsFiltered}/>

      </div>
  )
};

export default App