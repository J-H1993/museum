import Gallery from '../components/Gallery'
import { useState } from 'react'


const Home = () =>{
    const [pageNo, setPageNo] = useState(1)
    const handlePageForwardClick = () =>{
        setPageNo((prevPageNo) => prevPageNo +1)
    }
    const handlePageBackClick = () =>{
        setPageNo((prevPageNo) => prevPageNo -1)
    }

    return (
        <>
            <Gallery page={pageNo} pageSize={10}/>
            <button onClick={handlePageForwardClick}>next</button>
            <button onClick={handlePageBackClick} disabled={pageNo===1}></button>
        </>
    )
}

export default Home