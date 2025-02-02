import { useState, useEffect } from "react";
import { getArtworkById } from "../utils/ArtInstituteOfChicago.api";
import { getObjectById } from "../utils/api";
import { deleteItemFromExhibit } from "./PersonalExhibitonStorage";
import { Link } from "react-router-dom";
import placeholder from "../assets/placeholder.jpg";

const PersonalExhibitItems = ({
  personalExhibitName,
  pageNo,
  setTotalGallerySize,
  pageSize,
}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const savedExhibits = JSON.parse(localStorage.getItem("exhibits")) || {};

    if (savedExhibits[personalExhibitName]) {
      const fetchItemsDetails = async () => {
        try {
          const artworksPromises = savedExhibits[personalExhibitName].map(
            async (artifact) => {
              if (artifact.collection === "Metropolitan Museum") {
                const fullData = await getObjectById(artifact.id);
                return {
                  ...artifact,
                  title: fullData.title || "Untitled",
                  image_id:
                    fullData.primaryImageSmall ||
                    fullData.primaryImage ||
                    placeholder,
                  collection: artifact.collection,
                };
              } else {
                const fullData = await getArtworkById(artifact.id);
                return {
                  ...artifact,
                  title: fullData.data.title || "Untitled",
                  image_id: fullData.data.image_id || placeholder,
                  collection: artifact.collection,
                };
              }
            }
          );

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
  }, [personalExhibitName, setTotalGallerySize, refreshKey]);

  const iiifBaseUrl =
    localStorage.getItem("iiifBaseURL") || "https://www.artic.edu/iiif/2";
  const paginatedItems = items.slice(
    (pageNo - 1) * pageSize,
    pageNo * pageSize
  );

  const handleDeleteItem = (itemId) => {
    const updatedItems = deleteItemFromExhibit(personalExhibitName, itemId);
    setItems(updatedItems);
    setTotalGallerySize(updatedItems.length);

    setRefreshKey((prevKey) => prevKey + 1);

    console.log("Updated Exhibit Items after Deletion:", updatedItems);
  };

  return (
    <div key={refreshKey}>
      {loading ? (
        <p className="text-center">Loading, please wait...</p>
      ) : items.length === 0 ? (
        <p className="text-center">
          There are currently no items to display in this exhibit!
        </p>
      ) : (
        <div
          className={`row ${
            paginatedItems.length < 3 ? "justify-content-center" : ""
          }`}
        >
          {paginatedItems.map((item, index) => {
            const chicagoImageUrl =
              item.collection === "Metropolitan Museum"
                ? item.image_id || placeholder
                : `${iiifBaseUrl}/${item.image_id}/full/843,/0/default.jpg`;

            const itemUrl =
              item.collection === "Metropolitan Museum"
                ? `/artifact/${item.id}`
                : `/artworks/${item.id}`;

            return (
              <div
                key={item.id || index}
                className="col-md-4 mb-4 d-flex justify-content-center"
              >
                <div className="card h-100">
                  <Link
                    to={itemUrl}
                    state={{
                      selectedCollection: item.collection,
                      iiif: iiifBaseUrl,
                      image_id: item.image_id,
                    }}
                  >
                    <img
                      src={chicagoImageUrl}
                      alt={item.title}
                      className="card-img-top"
                      onError={(e) => (e.target.src = placeholder)}
                    />
                    <div className="card-body text-center">
                      <h3 className="card-title">{item.title}</h3>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="btn btn-danger mt-auto"
                  >
                    Delete from Exhibit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PersonalExhibitItems;
