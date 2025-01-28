import {useState, useEffect} from 'react'

const PersonalExhibitItems = ({personalExhibitName}) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        const savedExhibits = JSON.parse(localStorage.getItem("exhibits")) || {};
        console.log("🔍 Loaded exhibits:", savedExhibits);
    
        if (savedExhibits[personalExhibitName]) {
            setItems([...savedExhibits[personalExhibitName]]); 
        } else {
            setItems([]);
        }
    }, [personalExhibitName]);

    return (
        <div>
            <h2>{personalExhibitName}</h2>
            {items.length === 0 ? (
                <p>There are currently no items to display in this exhibit!</p>
                    ) :(
                        <div className="card-deck">
                            {items.map((item) => (
                                <div key={item.id} className="card">
                                    <img src={item.image} alt={item.title} className="card-img-top"/>
                                    <div className="card-body">
                                        <h3>{item.title}</h3>
                                        <p>Source: {item.collection}</p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )
                
                }
        </div>
    )
}

export default PersonalExhibitItems