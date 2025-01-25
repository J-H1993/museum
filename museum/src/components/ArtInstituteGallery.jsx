import {useState, useEffect} from 'react'
import { getArtworks } from '../utils/ArtInstituteOfChicago.api'
import { getArtworksByExhibit } from '../utils/ArtInstituteOfChicago.api'
import ArtifactCard from './ArtifactCard'


const ArtInstituteGallery = ({page, selectedExhibition}) =>{
    const [isLoading, setIsLoading] = useState(false)
    const [museumObjects, setMuseumObjects] = useState([])
    const [iiif, setIiif] = useState('')

    useEffect(()=>{
        setMuseumObjects([])
        setIsLoading(true)

        const fetchArtworks = async () =>{
            try{
                const response = await getArtworks(page)
                const iiifUrl = response.config.iiif_url
                    setMuseumObjects(response.data|| [])
                    setIiif(iiifUrl)
                
            } catch(error){
                console.error('Error fetching artworks from the Art Institute Of Chicago collection:', error.message)
            } finally {
                setIsLoading(false)
            }
        }

        const fetchArtworksbyExhibition = async () =>{
            try{
                const response = await getArtworksByExhibit(selectedExhibition)
                const iiifUrl = response.config.iiif_url
                const artworkArray = response.data.data.artworks
                setMuseumObjects(artworkArray || [])
                setIiif(iiifUrl)

            }catch(error){
                console.error('Error fetching artworks for the chosen exhibit:', error.message)
            }finally{
                setIsLoading(false)
            }
        }
        if(!selectedExhibition){
            fetchArtworks()
        }else{
            fetchArtworksbyExhibition()
            console.log('Log after exhibition call',museumObjects)
        }
        

    },[page, selectedExhibition])

    return(
        <>
            {museumObjects.map((artwork, index)=>{
                const imageUrl = `${iiif}/${artwork.image_id}/full/843,/0/default.jpg`
                return(
                    <div key={artwork.id || index} className='col-md-4 mb-4'>
                        <ArtifactCard key={artwork.id} artwork={artwork} imageUrl={imageUrl}/>
                    </div>
                )
            })}
        </>
    )


    
}

export default ArtInstituteGallery