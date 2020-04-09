import React from "react";
import Weather from "./Weather";

const CountryDetail = ({country}) => {

  return(
    <div>
      <h2><p>{country.name}</p></h2>
      <p>Capital: {country.capital}</p>

      <p>Population: {country.population}</p>
      Languages
      <ul>
        {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>

      <img src={country.flag} alt={'flag'} height={'100px'}/>
      <Weather city={country.capital}/>
    </div>
  )
}

export default CountryDetail