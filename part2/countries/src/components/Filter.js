import React from "react";

const Filter = ({search, handleChange}) => {
  return(
    <p>
      Search countries: <input value={search} onChange={handleChange}/>
    </p>
  )
}

export default Filter