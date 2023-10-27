import axios from 'axios'

const baseURL = "http://localhost:3001/persons"

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

const update = (id, newPerson) => {
    const request = axios.put(`${baseURL}/${id}`, newPerson)
    return request.then(response => response.data)
}


export default { getAll, create, update }