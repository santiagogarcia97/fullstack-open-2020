import React from "react";
import PersonDetails from "./PersonDetails";

const PersonList = ({persons, handlePersonDelete}) => {
  return(
    <div>
      {persons.map((p) =>
        <PersonDetails
          key={p.name}
          person={p}
          handlePersonDelete={handlePersonDelete}
        />)}
    </div>
  )
}

export default PersonList