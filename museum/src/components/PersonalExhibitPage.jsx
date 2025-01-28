import {useState, useEffect} from 'react'


const ListOfPersonalExhibits =({onExhibitSelected}) => {
    
    const [personalExhibits, setPersonalExhibits] = useState([])

    useEffect(() => {
        const fetchExhibits = () => {
            const savedPersonalExhibits = JSON.parse(localStorage.getItem('exhibits')) || {};
            console.log("🔍 Loaded exhibits:", savedPersonalExhibits);
            setPersonalExhibits(Object.keys(savedPersonalExhibits));
        };

        fetchExhibits();

        window.addEventListener("storage", fetchExhibits);
        return () => window.removeEventListener("storage", fetchExhibits);
    }, []);

    return (
        <div>
            <h2>Your Personal Exhibitions</h2>
            {personalExhibits.length === 0 ? (
                <p>No Personal Exhibitions found. Create one to get started!</p>
            ):(
                <ul>
                    {personalExhibits.map((exhibitName)=>(
                        <li key={exhibitName}>
                            <button onClick={() => onExhibitSelected(exhibitName)}>
                                {exhibitName}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )


}

export default ListOfPersonalExhibits