import Gallery from '../components/Gallery'
import ArtInstituteGallery from '../components/ArtInstituteGallery'
import SelectCollection from '../components/SelectCollection'
import MetArtifactFilter from '../components/MetArtifactFilter'
import { useState } from 'react'



const Home = () =>{
    const [pageNo, setPageNo] = useState(1)
    const [selectedDepartment, setSelectedDepartment] = useState('')
    const [collection, setCollection] = useState('')
    const handlePageForwardClick = () =>{
        setPageNo((prevPageNo) => prevPageNo +1)
    }
    const handlePageBackClick = () =>{
        setPageNo((prevPageNo) => prevPageNo -1)
    }
    return (
        <>  
            <SelectCollection collection={collection} setCollection={setCollection}/>
            <MetArtifactFilter selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment} />
            {collection === 'Metopoliton Museum'?(<Gallery page={pageNo} pageSize={6} selectedDepartment={selectedDepartment} />) : <ArtInstituteGallery page={pageNo} pageSize={6}/>}
            <button onClick={handlePageForwardClick}>next</button>
            <button onClick={handlePageBackClick} disabled={pageNo===1}>Previous</button>
        </>
    )
}

export default Home