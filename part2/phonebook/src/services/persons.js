import axios from 'axios'

const apiUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios
    .get(apiUrl)
    .then(response => response.data)
}

const create = (person) => {
  return axios
    .post(apiUrl, person)
    .then(response => response.data)
}

const remove = (person) => {
  return axios
    .delete(`${apiUrl}/${person.id}`)
    .then(response => response.data)
}

const update = (person) => {
  return axios
    .put(`${apiUrl}/${person.id}`, person)
    .then(response => response.data)
}

export default {getAll, create, remove, update}