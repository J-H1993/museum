import {useState, useEffect} from 'react'
import {getObjectIds, getObjectById, getObjectsByDepartment} from '../utils/api'

const Gallery = ({page, pageSize, selectedDepartment}) =>{
    const [isLoading, setIsLoading] = useState(false)
    const [objectIds, setObjectIds] = useState([])
    const [museumObjects, setMuseumObjects] = useState([])

    useEffect(() => {
        setMuseumObjects([])
        setIsLoading(true);
    
        if (selectedDepartment) {
            getObjectsByDepartment(selectedDepartment)
                .then((ids) => {
                    console.log('fetch Ids for department:>>>>>>>>>', ids)
                    setObjectIds(ids || []);
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
            console.log('fetched Values>>>>>>>>',values)
            const filteredArray = values.filter((exhibit)=>{
                return exhibit !== null
        })
        setMuseumObjects(filteredArray)
        console.log('updating museumObjects, filteredArray')
        })
        .catch((error)=>{
            console.error('Error fetching museum objects:', error.message)
        })
    }, [objectIds, page, pageSize])

return (
    <div>
        {console.log('Rendering museumObjects:', museumObjects)}
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