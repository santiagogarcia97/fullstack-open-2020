import React from "react";

import CountryDetail from "./CountryDetail";

const CountryList = ({countries}) => {

  if(countries.length === 1){
    return (
      <CountryDetail country={countries[0]}/>
    )
  }
  else if(countries.length < 10 && countries.length > 1) {
    return (
      <ul>
        {countries.map((c) => <li key={c.name}>{c.name}</li> )}
      </ul>
    )
  }
  else if(countries.length > 10){
    return (
      <p>Too many countries, be more specific</p>
    )
  }
  else {
    return(
      <p>No results</p>
    )
  }
}

export default CountryList