import axios from 'axios'

const apiUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios
    .get(apiUrl)
    .then(response => response.data)
}

const create = (newPerson) => {
  return axios
    .post(apiUrl, newPerson)
    .then(response => response.data)
}

export default {getAll, create}