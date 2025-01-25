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
    const handlePageForwardClick = () =>{
        setPageNo((prevPageNo) => prevPageNo +1)
    }
    const handlePageBackClick = () =>{
        setPageNo((prevPageNo) => prevPageNo -1)
    }
    return (
        <>  
            <SelectCollection collection={collection} setCollection={setCollection}/>
            {collection === 'Metropolitan Museum'?(<MetArtifactFilter selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment}/>) : <ArtInstituteFilter selectedExhibiton={selectedExhibiton} setSelectedExhibition={setSelectedExhibition}/>}
            {collection === 'Metropolitan Museum'?(<Gallery page={pageNo} pageSize={6} selectedDepartment={selectedDepartment} selectedCollection={collection} />) : <ArtInstituteGallery page={pageNo} pageSize={6} selectedExhibition={selectedExhibiton}/>}
            <button onClick={handlePageForwardClick}>next</button>
            <button onClick={handlePageBackClick} disabled={pageNo===1}>Previous</button>
        </>
    )
}

export default Home