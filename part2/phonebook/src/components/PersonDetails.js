import React from "react";

const PersonDetails = ({person}) => {
  return(
    <p>{person.name} {person.number}</p>
  )
}

export default PersonDetails