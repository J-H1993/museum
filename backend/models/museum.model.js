import axios from 'axios'

const smithsonian = axios.create({
    baseURL:"https://api.si.edu/openaccess/api/v1.0",
    params:{
        api_key:process.env.REACT_APP_API_KEY
    }
})



exports.getArtworks = async () => {
    try{
        const artworks = await smithsonian.get(`/search`, {
            params:{q:'art', rows:'6', sort:'random', type:'all'}
        })
        return artworks.data
    } catch(error){
        console.error('Error getting artworks for gallery', error.message)
        throw(error)
    }
}