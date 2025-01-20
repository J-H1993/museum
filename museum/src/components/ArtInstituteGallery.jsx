import {useState, useEffect} from 'react'
import { getArtworks } from '../utils/ArtInstituteOfChicago.api'


const ArtInstituteGallery = () =>{
    const [isLoading, setIsLoading] = useState(false)
    const [museumObjects, setMuseumObjects] = useState([])
    const [iiif, setIiif] = useState('')

    useEffect(()=>{
        setMuseumObjects([])
        setIsLoading(true)

        const fetchArtworks = async () =>{
            try{
                const response = await getArtworks()
                const iiifUrl = response.config.iiif_url
                    setMuseumObjects(response.data|| [])
                    setIiif(iiifUrl)
                
            } catch(error){
                console.error('Error fetching artworks from the Art Institute Of Chicago collection:', error.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchArtworks()

    },[])

    return(
        <>
            {museumObjects.map((artwork, index)=>{
                const imageUrl = `${iiif}/${artwork.image_id}/full/843,/0/default.jpg`
                return(
                    <div key={artwork.id || index}>
                    <img  src={imageUrl}/>
                    <h3>{artwork.title}</h3>
                    </div>
                )
            })}
        </>
    )


    
}

export default ArtInstituteGallery