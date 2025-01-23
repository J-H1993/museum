import {useState, useEffect} from 'react'


const SelectCollection = ({collection, setCollection, onCollectionChange}) =>{
    const [isLoading, setIsLoading] = useState(false)

    const collections = ['Art Institute Of Chicago', 'Metropolitan Museum']

    useEffect(()=> {
        setIsLoading(true)
        
    },[])

    const handleSelectedCollectionChange = (event) =>{
        setCollection(event.target.value)
    }
    
    return (
        <form>
            <label htmlFor='select-collection'>Select Collection</label>
            <select
            id="select-collection"
            value={collection}
            onChange={handleSelectedCollectionChange}>
                {collections.map((collection)=>{
                    return(
                    <option key={collection} value={collection}>
                        {collection}
                    </option>
                    )
                })}
            </select>
        </form>
    )
}

export default SelectCollection