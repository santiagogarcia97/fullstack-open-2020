import React from "react";
import PersonDetails from "./PersonDetails";

const PersonList = ({persons}) => {
  return(
    <div>
      {persons.map((p) => <PersonDetails key={p.name} person={p}/>)}
    </div>
  )
}

export default PersonList