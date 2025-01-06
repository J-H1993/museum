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
    return metMuseum.get(`/objects/${objectID}`).then(({data})=>{
        return data
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
        console.error('Error fetching multiple objects from api:', error.message)
        return []
    })
}