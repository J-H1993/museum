import {useState, useEffect} from 'react'
import {getObjectIds, getObjectById, getObjectsByDepartment} from '../utils/api'
import ArtifactCard from './ArtifactCard'

const Gallery = ({page, pageSize, selectedDepartment, selectedCollection, setTotalGallerySize}) =>{
    const [isLoading, setIsLoading] = useState(false)
    const [objectIds, setObjectIds] = useState([])
    const [museumObjects, setMuseumObjects] = useState([])

    useEffect(() => {
        setMuseumObjects([])
        setIsLoading(true);
        if (selectedDepartment) {
            getObjectsByDepartment(selectedDepartment)
                .then((ids) => {
                    setObjectIds(ids || []);
                    setTotalGallerySize(ids.length)
                })
                .catch((error) => {
                    console.error('Error fetching IDs for department:', error.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            getObjectIds()
                .then((ids) => {
                    setObjectIds(ids || []);
                })
                .catch((error) => {
                    console.error('Error fetching all IDs:', error.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [selectedDepartment])
    

    useEffect(()=>{
        if (!objectIds.length) return
        
        const startIndex = (page - 1 ) * pageSize
        const endIndex = startIndex + pageSize
        const pageObjectIds = objectIds.slice(startIndex, endIndex)
        const promises = pageObjectIds.map((id)=>{
            return getObjectById(id)
        })
        Promise.all(promises).then((values)=>{
            const filteredArray = values.filter((artifact)=>{
                return artifact !== null
        })
        setMuseumObjects(filteredArray)
        })
        .catch((error)=>{
            console.error('Error fetching museum objects:', error.message)
        })
    }, [objectIds, page, pageSize])

return (
    <div className='container'>
        {isLoading && <p>Loading, please wait......</p>}
        <div className='row'>
            {museumObjects.map((artifact) => (
                <div key={artifact.objectID} className='col-md-4 mb-4'>
                    <ArtifactCard key={artifact.objectID} artifact={artifact} selectedCollection={selectedCollection} />
                </div>
            ))}
        </div>
    </div>
)
}
export default Gallery