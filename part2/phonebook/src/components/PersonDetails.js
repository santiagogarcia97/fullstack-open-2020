import React from "react";

const PersonDetails = ({person, handlePersonDelete}) => {

  return(
    <p>
      <strong>{person.name}</strong> {person.number}
      <button onClick={() => {
        handlePersonDelete(person)
      }}>
        Delete
      </button>
    </p>
  )
}

export default PersonDetails