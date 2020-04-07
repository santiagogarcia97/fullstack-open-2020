import React from "react";

const PersonForm = ({onSubmit, name, number, handleName, handleNumber}) => {

  return(
    <form onSubmit={onSubmit}>
      <div>
        <p>Name: <input value={name} onChange={handleName} /></p>
        <p>Number: <input value={number} onChange={handleNumber} /></p>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;