import axios from 'axios'

const artInstitute = axios.create({
    baseURL:'https://api.artic.edu/api/v1'
})

export const getArtworks = async (pageNo) =>{
    try{
        const {data} = await artInstitute.get(`/artworks?page=${pageNo}&limit=6&fields=id,title,image_id`)
        console.log({data})
        return data
    }catch(err){
        console.error('Error getting artwork for the gallery:', err.message)
    }
    
}