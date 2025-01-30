import axios from 'axios'

const artInstitute = axios.create({
    baseURL:'https://api.artic.edu/api/v1'
})

export const getArtworks = async (pageNo) =>{
    try{
        const {data} = await artInstitute.get(`/artworks?page=${pageNo}&limit=6&fields=id,title,image_id`)
        return data
    }catch(err){
        console.error('Error getting artwork for the gallery:', err.message)
    }
    
}

export const getInstituteExhibitions= async () => {
    try{
        const data = await artInstitute.get(`/exhibitions`)
        return {data}
    }catch(err){
        console.error('Error getting departments list:', err.message)
    }
}

export const getArtworksByExhibit = async (exhibitionId, pageNo) => {
    try{
        const data = await artInstitute.get(`/exhibitions/${exhibitionId}`,{
            params:{
                include:'artworks',
                page:pageNo,
                limit:6
            }
        })
        return data
    }catch(err){
        console.error('Error getting artworks for selected exhibit:', err.message)
    }
}

export const getArtworkById = async (artworkId) => {
    try{
        const {data} = await artInstitute.get(`/artworks/${artworkId}`)
        return data
    }catch(err){
        console.error('Error fetching artwork by id:', err.message)
    }
}

