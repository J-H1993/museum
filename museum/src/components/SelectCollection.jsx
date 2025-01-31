import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const SelectCollection = ({ collection, setCollection }) => {
    const [personalExhibits, setPersonalExhibits] = useState([]);

    const collections = ['Art Institute Of Chicago', 'Metropolitan Museum', 'Personal Exhibits'];
    const navigate = useNavigate();  

    useEffect(() => {
        const savedExhibits = JSON.parse(localStorage.getItem("exhibits")) || [];
        setPersonalExhibits(savedExhibits);
    }, []);

    const handleSelectedCollectionChange = (event) => {
        const selected = event.target.value;
        setCollection(selected);
        if (selected === 'Personal Exhibits') {
            navigate('/collections');  
        }
    };

    return (
        <form>
            <label htmlFor="select-collection">Select Collection</label>
            <select
                id="select-collection"
                value={collection}
                onChange={handleSelectedCollectionChange}
            >
                {collections.map((collection) => (
                    <option key={collection} value={collection}>
                        {collection}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default SelectCollection;

