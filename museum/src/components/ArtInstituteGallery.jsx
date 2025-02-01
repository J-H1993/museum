import {useState, useEffect} from 'react'
import { getArtworks } from '../utils/ArtInstituteOfChicago.api'
import { getArtworksByExhibit } from '../utils/ArtInstituteOfChicago.api'
import { getArtworkById } from '../utils/ArtInstituteOfChicago.api'
import ArtifactCard from './ArtifactCard'
import EmptyExhibitCard from './EmptyExhibitCard'


const ArtInstituteGallery = ({page, selectedExhibition, setTotalGallerySize}) =>{
    const [isLoading, setIsLoading] = useState(false)
    const [museumObjects, setMuseumObjects] = useState([])
    const [iiif, setIiif] = useState('')
    const itemsPerPage = 6

    useEffect(()=>{
        setMuseumObjects([])
        setIsLoading(true)

        const fetchArtworks = async () =>{
            try{
                const response = await getArtworks(page)
                const iiifUrl = response.config.iiif_url
                setTotalGallerySize(response.pagination.total)
                    setMuseumObjects(response.data|| [])
                    if(iiifUrl){
                        setIiif(iiifUrl)
                        localStorage.setItem("iiifBaseURL", iiifUrl)
                    }
                    
                
            } catch(error){
                console.error('Error fetching artworks from the Art Institute Of Chicago collection:', error.message)
            } finally {
                setIsLoading(false)
            }
        }

        const fetchArtworksbyExhibition = async () =>{
            try{
                setIsLoading(true)
                const response = await getArtworksByExhibit(selectedExhibition)
                const iiifUrl = response.data.config.iiif_url
                setIiif(iiifUrl)
                const artworkIdArray = response.data.data.artwork_ids
                const artworkPromises = artworkIdArray.map((id)=> getArtworkById(id))
                const artworkObjects = await Promise.all(artworkPromises)
                const extractedArtworks = artworkObjects.map((artwork)=>{
                    const {data} = artwork
                    return {id:data.id, title:data.title, image_id:data.image_id, artist_display:data.artist_display}
                })
                setMuseumObjects(extractedArtworks || [])
                setTotalGallerySize(artworkIdArray.length)

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
        }
        

    },[page, selectedExhibition])

    const paginatedArtwork = selectedExhibition ? museumObjects.slice((page -1) * itemsPerPage, page * itemsPerPage) : museumObjects

    return(
        <>
            {museumObjects.length === 0 && !isLoading ? (
                <EmptyExhibitCard />
            ) : (
                <div className="row">
                {paginatedArtwork.map((artwork, index) => {
                  const imageUrl = `${iiif}/${artwork.image_id}/full/843,/0/default.jpg`;
                  return (
                    <div key={artwork.id || index} className="col-md-4 mb-4">
                      <ArtifactCard artwork={artwork} imageUrl={imageUrl} artworkId={artwork.id} iiif={iiif} />
                    </div>
                  );
                })}
              </div>
            )}
        
        </>
    )


    
}

export default ArtInstituteGallery