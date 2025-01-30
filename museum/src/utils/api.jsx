import axios from 'axios'

const metMuseum = axios.create({
    baseURL:"https://collectionapi.metmuseum.org/public/collection/v1"
})



export const getObjectIds = () =>{
    return metMuseum.get('/objects').then(({data}) =>{
        return data.objectIDs
    })
}

export const getObjectById = (objectId) =>{
    return metMuseum.get(`/objects/${objectId}`).then(({data})=>{
        console.log(data)
        return data
    }).catch((error)=>{
        console.error('Error getting object by id:', error.message)
    })

}

export const getMultipleObjectsById = (objectIds) => {
    const objectPromises = objectIds.map((id) => {
        return getObjectById(id)
    })
    return Promise.all(objectPromises).then((data) =>{
        return data.filter((object) => object !== null)
    })
    .catch((error)=>{
        console.error('Error getting multiple objects from api:', error.message)
        return []
    })
}

export const getDepartments = () => {
    return metMuseum.get('/departments').then(({data})=>{
        return data.departments
    })
    .catch((error)=>{
        console.error('Error getting departments:', error.message)
    })
}

export const getObjectsByDepartment = (department) => {
    return metMuseum.get(`/objects?departmentIds=${department}`).then(({data})=>{
        return data.objectIDs
    })
    .catch((error)=>{
        console.error('Error getting exhibits for the department:', error.message)
    })

}