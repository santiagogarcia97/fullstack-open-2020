import React from "react";

import CountryDetail from "./CountryDetail";

const CountryList = ({countries, handleShowClick}) => {

  if(countries.length === 1){
    return (
      <CountryDetail country={countries[0]}/>
    )
  }
  else if(countries.length < 10 && countries.length > 1) {
    return (
      <div>
        {countries.map( c => {
          return(
            <div key={c.name}>{c.name}
              <button onClick={() => handleShowClick(c.name)}>
                show
              </button>
            </div>
          )}
        )}
      </div>
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