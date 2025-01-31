import { useState, useEffect } from "react";
import { getArtworkById } from "../utils/ArtInstituteOfChicago.api";
import { getObjectById } from "../utils/api"; 
import { deleteItemFromExhibit } from "./PersonalExhibitonStorage";
import { Link } from 'react-router-dom';  

const PersonalExhibitItems = ({ personalExhibitName, pageNo, setTotalGallerySize, pageSize }) => {
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
                            return {
                                ...artifact,
                                title: fullData.title || "Untitled",
                                image_id: fullData.primaryImageSmall || fullData.primaryImage || "placeholder.jpg",
                                collection: artifact.collection
                            };
                        } else {
                            const fullData = await getArtworkById(artifact.id); 
                            return {
                                ...artifact,
                                title: fullData.data.title || "Untitled",
                                image_id: fullData.data.image_id || "placeholder.jpg",
                                collection: artifact.collection
                            };
                        }
                    });

                    const fullItems = await Promise.all(artworksPromises);
                    setItems(fullItems);
                    setTotalGallerySize(fullItems.length);
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
    }, [personalExhibitName, setTotalGallerySize]);

    const iiifBaseUrl = localStorage.getItem("iiifBaseURL") || "https://www.artic.edu/iiif/2";

    const paginatedItems = items.slice((pageNo - 1) * pageSize, pageNo * pageSize);

    const handleDeleteItem = (itemId) => {
        const updatedItems = deleteItemFromExhibit(personalExhibitName, itemId);
        setItems(updatedItems);
        setTotalGallerySize(updatedItems.length);
        alert("This item has been deleted from the exhibit.");
    };

    return (
        <div>
            <h2>{personalExhibitName}</h2>
            {loading ? (
                <p>Loading items...</p>
            ) : items.length === 0 ? (
                <p>There are currently no items to display in this exhibit!</p>
            ) : (
                <div className="card-deck">
                    {paginatedItems.map((item) => {
                        let fullImageUrl;
                        
                        if (item.collection === "Metropolitan Museum") {
                            fullImageUrl = item.image_id || item.primaryImageSmall || "placeholder.jpg";
                        } else {
                            fullImageUrl = `${iiifBaseUrl}/${item.image_id}/full/843,/0/default.jpg`;
                        }

                        
                        const itemUrl = item.collection === "Metropolitan Museum"
                            ? `/artifact/${item.id}` 
                            : `/artworks/${item.id}`;

                        return (
                            <div key={item.id} className="card">
                                <Link to={itemUrl}  state={{ selectedCollection: item.collection, iiif: iiifBaseUrl, image_id:item.image_id}}>
                                    <img src={fullImageUrl} alt={item.title} className="card-img-top" />
                                    <div className="card-body">
                                        <h3>{item.title}</h3>
                                        <p>Source: {item.collection}</p>
                                    </div>
                                </Link>
                                <button onClick={() => handleDeleteItem(item.id)} className="btn btn-danger">
                                    Delete item from exhibition
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PersonalExhibitItems;

