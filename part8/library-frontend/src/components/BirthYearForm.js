import React, {useState} from 'react'

const BirthYearForm = ({setBirthYear}) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const updateAuthor = async () => {
    await setBirthYear({
      variables: {
        name: name,
        setBornTo: parseInt(year)
      }
    })

    setName('')
    setYear('')
  }

  return(
    <div>
      <h3>Change author birthyear</h3>
      <br/>
      <label>Name: </label>
      <input type='text' value={name} onChange={({target}) => {setName(target.value)}}/>
      <br/>
      <label>Birthyear: </label>
      <input type='number' value={year} onChange={({target}) => {setYear(target.value)}}/>
      <br/>
      <button onClick={updateAuthor}>Update year</button>
    </div>
  )
}

export default BirthYearForm