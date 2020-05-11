import React, {useState} from 'react'
import Select from 'react-select'

const BirthYearForm = ({setBirthYear, authors}) => {
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [year, setYear] = useState('')

  const selectOptions = authors.map(a => {
    return {value: a.name, label: a.name}
  })

  const updateAuthor = async () => {
    await setBirthYear({
      variables: {
        name: selectedAuthor,
        setBornTo: parseInt(year)
      }
    })

    setSelectedAuthor('')
    setYear('')
  }

  return(
    <div>
      <h3>Change author birthyear</h3>
      <br/>
      <label>Name: </label>
      <Select
        value={selectedAuthor}
        onChange={(target) => {setSelectedAuthor(target.value)}}
        options={selectOptions}
      />
      <br/>
      <label>Birthyear: </label>
      <input type='number' value={year} onChange={({target}) => {setYear(target.value)}}/>
      <br/>
      <button onClick={updateAuthor}>Update year</button>
    </div>
  )
}

export default BirthYearForm