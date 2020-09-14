import axios from 'axios'
const apiUrl = '/api/persons' //'https://polar-spire-33098.herokuapp.com/api/persons' //'http://localhost:3001/api/persons'

const getAll = () => {
    return axios
      .get(apiUrl)
      .then(response => response.data)
}

const createOne = newPerson => {
    return axios
        .post(apiUrl, newPerson)
        .then(response => response.data)
}

const updateOne = updatedPerson => {
    return axios
        .put(`${apiUrl}/${updatedPerson.id}`, updatedPerson)
        .then(response => response.data)
}

const deleteOne = (id) => {
    return axios
    .delete(`${apiUrl}/${id}`)
}

export default { getAll, createOne, updateOne, deleteOne }