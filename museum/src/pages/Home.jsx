import Gallery from '../components/Gallery'
import ArtInstituteGallery from '../components/ArtInstituteGallery'
import SelectCollection from '../components/SelectCollection'
import MetArtifactFilter from '../components/MetArtifactFilter'
import ArtInstituteFilter from '../components/ArtInstituteFilter'
import { useState } from 'react'



const Home = () =>{
    const [pageNo, setPageNo] = useState(1)
    const [selectedDepartment, setSelectedDepartment] = useState('')
    const [selectedExhibiton, setSelectedExhibition] = useState('')
    const [collection, setCollection] = useState('Art Institute Of Chicago')
    const [totalGallerySize, setTotalGallerySize] = useState(0)

    const itemsPerPage = 6

    const handlePageForwardClick = () =>{
        setPageNo((prevPageNo) => prevPageNo +1)
    }
    const handlePageBackClick = () =>{
        setPageNo((prevPageNo) => prevPageNo -1)
    }

    const disableNextButton = pageNo >= Math.ceil(totalGallerySize/6)
    
    return (
        <>  
            <SelectCollection collection={collection} setCollection={setCollection}/>
            {collection === 'Metropolitan Museum'?(<MetArtifactFilter selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment}/>) : <ArtInstituteFilter selectedExhibiton={selectedExhibiton} setSelectedExhibition={setSelectedExhibition}/>}
            {collection === 'Metropolitan Museum'?(<Gallery page={pageNo} pageSize={itemsPerPage} selectedDepartment={selectedDepartment} selectedCollection={collection} setTotalGallerySize={setTotalGallerySize} />) : <ArtInstituteGallery page={pageNo} pageSize={itemsPerPage} selectedExhibition={selectedExhibiton} setTotalGallerySize={setTotalGallerySize}/>}
            <button onClick={handlePageForwardClick} disabled={disableNextButton}>next</button>
            <button onClick={handlePageBackClick} disabled={pageNo===1}>Previous</button>
        </>
    )
}

export default Home