import Gallery from '../components/Gallery'
import ExhibitsFilter from '../components/ExhibitsFilter'
import { useState } from 'react'



const Home = () =>{
    const [pageNo, setPageNo] = useState(1)
    const [selectedDepartment, setSelectedDepartment] = useState('')
    const handlePageForwardClick = () =>{
        setPageNo((prevPageNo) => prevPageNo +1)
    }
    const handlePageBackClick = () =>{
        setPageNo((prevPageNo) => prevPageNo -1)
    }
    console.log('current selectsedDepartment:,>>>>>>>>>>>>>', selectedDepartment)
    return (
        <>  
            <ExhibitsFilter selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment} />
            <Gallery page={pageNo} pageSize={10} selectedDepartment={selectedDepartment}/>
            <button onClick={handlePageForwardClick}>next</button>
            <button onClick={handlePageBackClick} disabled={pageNo===1}>Previous</button>
        </>
    )
}

export default Home