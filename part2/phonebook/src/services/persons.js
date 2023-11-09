import axios from 'axios'

const baseURL = "/api/persons"

/**
 * 
 * @returns all Persons form the Server 
 */
const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const update = (id, updatePerson) => {
    const request = axios.put(`${baseURL}/${id}`, updatePerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}


export default { getAll, create, update, remove }