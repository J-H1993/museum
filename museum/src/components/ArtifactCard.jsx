import { Link } from "react-router-dom";
import "../App.css";
import placeholder from "../assets/placeholder.jpg"

const ArtifactCard = ({
  artifact,
  artwork,
  imageUrl,
  selectedCollection,
  artworkId,
  iiif,
}) => {
  console.log(imageUrl);
  if (selectedCollection === "Metropolitan Museum") {
    const { objectID, title, primaryImageSmall, primaryImage } = artifact;
    return (
      <div className="card h-100">
        <Link to={`/artifact/${objectID}`} state={{ selectedCollection }}>
          <img
            src={primaryImageSmall || primaryImage || placeholder}
            className="card-img-top"
            alt={title || "Untitled"}
          />
          <div className="card-body">
            <h3 className="card-title">{title || "Untitled"}</h3>
          </div>
        </Link>
      </div>
    );
  } else {
    const chicagoImageUrl = imageUrl || placeholder
    return (
      <div className="card h-100">
        <Link
          to={`/artworks/${artworkId}`}
          state={{ selectedCollection:selectedCollection || "Art Institute Of Chicago", iiif }}
        >
          <img src={chicagoImageUrl} alt={artwork.title} className="card-img-top" onError={(e)=> e.target.src = placeholder} />
          <h3>{artwork.title || "untitled"}</h3>
        </Link>
      </div>
    );
  }
};

export default ArtifactCard;
