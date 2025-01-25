import { useState, useEffect } from "react";
import {getInstituteExhibitions} from '../utils/ArtInstituteOfChicago.api';

const ArtInstituteFilter = ({selectedExhibition, setSelectedExhibition}) =>{
    const [exhibition, setExhibition] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        const fetchInstituteExhibitions = async () =>{
            try{
                const instituteExhibitions = await getInstituteExhibitions()
                const exhibitionArray = instituteExhibitions.data.data.data
                console.log('Array of exhibitions',exhibitionArray)
                setExhibition(exhibitionArray)
            }catch(error){
                console.error(`Failed to fetch list of exhibitions:`, error.message)
            }finally{
                setIsLoading(false)
            }
        }

        fetchInstituteExhibitions()
    },[])

    const handleSelectedExhibitionChange = (event) =>{
        setSelectedExhibition(event.target.value)
    }

    return(
        <form>
            <label htmlFor='select-exhibition'>Select Exhibition</label>
            <select
            id="select-exhibition"
            value={selectedExhibition}
            onChange={handleSelectedExhibitionChange}
            >
                <option value={""}>All</option>
                {exhibition.map((exhibition)=>(
                    <option key={exhibition.id} value={exhibition.id}>
                        {exhibition.title}
                    </option>
                ))}
            </select>
        </form>
    )
}

export default ArtInstituteFilter