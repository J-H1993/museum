import {useState, useEffect} from 'react'
import {getObjectIds, getObjectById} from '../utils/api'

const Gallery = ({page, pageSize}) =>{
    const [isLoading, setIsLoading] = useState(false)
    const [objectIds, setObjectIds] = useState([])
    const [museumObjects, setMuseumObjects] = useState([])

    useEffect(() =>{
        setIsLoading(true)
        getObjectIds()
        .then((ids)=>{
            setObjectIds(ids)
        })
        .catch((error)=>{
            console.error('Error fetching IDs:', error.message)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[])

    useEffect(()=>{
        if (!objectIds.length) return
        const startIndex = (page - 1 ) * pageSize
        const endIndex = startIndex + pageSize
        const pageObjectIds = objectIds.slice(startIndex, endIndex)
        const promises = pageObjectIds.map((id)=>{
            return getObjectById(id)
        })
        Promise.all(promises).then((values)=>{
            console.log('fetched Values>>>>>>>>',values)
            const filteredArray = values.filter((exhibit)=>{
                return exhibit !== null
        })
        setMuseumObjects(filteredArray)
        })
        .catch((error)=>{
            console.error('Error fetching museum objects:', error.message)
        })
    }, [objectIds, page, pageSize])

return (
    <div>
        {isLoading && <p>Loading, please wait......</p>}
        <div className='museumGrid'>
            {museumObjects.map((exhibit) => (
                <div key={exhibit.objectID} className='exhibitCard'>
                    <img
                        src={exhibit.primaryImageSmall || 'placeholder.jpg'}
                        alt={exhibit.title || 'Untitled'}
                    />
                    <h2>{exhibit.title}</h2>
                </div>
            ))}
        </div>
    </div>
)
}
export default Gallery