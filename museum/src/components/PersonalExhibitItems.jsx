import { useState, useEffect } from "react";
import { getArtworkById } from "../utils/ArtInstituteOfChicago.api";
import { getObjectById } from "../utils/api"; 

const PersonalExhibitItems = ({ personalExhibitName }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedExhibits = JSON.parse(localStorage.getItem("exhibits")) || {};

        if (savedExhibits[personalExhibitName]) {
            const fetchItemsDetails = async () => {
                try {
                    const artworksPromises = savedExhibits[personalExhibitName].map(async (artifact) => {
                        if (artifact.collection === "Metropolitan Museum") {
                            const fullData = await getObjectById(artifact.id); 
                            console.log('fullData', fullData.primaryImage)
                            return {
                                ...artifact,
                                title: fullData.title || "Untitled",
                                image_id: fullData.primaryImageSmall || fullData.primaryImage || "placeholder.jpg"
                            };
                        } else {
                            const fullData = await getArtworkById(artifact.id); 
                            return {
                                ...artifact,
                                title: fullData.data.title || "Untitled",
                                image_id: fullData.data.image_id || "placeholder.jpg"
                            };
                        }
                    });

                    const fullItems = await Promise.all(artworksPromises);
                    setItems(fullItems);
                } catch (error) {
                    console.error("Error fetching artifact details:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchItemsDetails();
        } else {
            setItems([]);
            setLoading(false);
        }
    }, [personalExhibitName]);

    const iiifBaseUrl = localStorage.getItem("iiifBaseURL") || "https://www.artic.edu/iiif/2";

    return (
        <div>
            <h2>{personalExhibitName}</h2>
            {loading ? (
                <p>Loading items...</p>
            ) : items.length === 0 ? (
                <p>There are currently no items to display in this exhibit!</p>
            ) : (
                <div className="card-deck">
                    {items.map((item) => {
                        let fullImageUrl;
                        console.log('item logged in map',item)
                        if (item.collection === "Metropolitan Museum") {
                            fullImageUrl = item.image_id || item.primaryImageSmall || "placeholder.jpg";
                            console.log('metropolitan museum', fullImageUrl)
                        } else {
                            fullImageUrl = `${iiifBaseUrl}/${item.image_id}/full/843,/0/default.jpg`;
                        }
    
                        return (
                            <div key={item.id} className="card">
                                <img src={fullImageUrl} alt={item.title} className="card-img-top" />
                                <div className="card-body">
                                    <h3>{item.title}</h3>
                                    <p>Source: {item.collection}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}    
export default PersonalExhibitItems;
