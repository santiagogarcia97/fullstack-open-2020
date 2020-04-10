const express = require('express')
const morgan = require('morgan')
const app = express()

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
]

morgan.token("content", req => {
  if (!req.body) return "";
  return JSON.stringify(req.body);
});

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))

app.get('/api/persons', (req, res) => {
  res.send(persons)
})

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  person ?
    res.send(person) :
    res.sendStatus(404)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.sendStatus(204)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!body.name){
    return res.status(400).json({error: 'name is missing'})
  }
  if(!body.number){
    return res.status(400).json({error: 'number is missing'})
  }

  let newPerson = {
    name: body.name,
    number: body.number,
    id: Math.round(Math.random()*99999)
  }

  if( persons.find(p =>
    p.name.toUpperCase() === newPerson.name.toUpperCase()) ) {
    return res.status(400).json({error: `${newPerson.name} already exists in the phonebook`})
  }
  else{
    persons.push(newPerson)
    res.send(newPerson)
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})