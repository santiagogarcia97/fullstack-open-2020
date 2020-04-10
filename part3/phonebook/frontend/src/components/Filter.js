import React from "react";

const Filter = ({searchName, handleFilter}) => {
  return(
    <p>
      Filter: <input value={searchName} onChange={handleFilter}/>
    </p>
  )
}

export default Filter