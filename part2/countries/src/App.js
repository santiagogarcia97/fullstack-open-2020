import React, {useState, useEffect} from 'react';
import axios from 'axios'

import Filter from "./components/Filter";
import CountryList from "./components/CountryList";

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [search, setSearch] = useState('')

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const filteredCountries = search
    ? allCountries.filter(
      country => country.name.toLowerCase().search(search.toLowerCase()) !== -1)
    : allCountries;

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])
  console.log(filteredCountries.length)

  return (
    <div>
      <Filter search={search} handleChange={handleChange}/>

      <CountryList countries={filteredCountries} handleShowClick={setSearch}/>
    </div>
  );
}

export default App;
