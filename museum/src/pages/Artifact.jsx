import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getObjectById } from "../utils/api";
import { getArtworkById } from "../utils/ArtInstituteOfChicago.api";
import { handleSaveToExhibit, createPersonalExhibit } from "../components/PersonalExhibitonStorage";
import Header from '../components/Header';
import Footer from '../components/Footer';
import placeHolder from '../assets/placeholder.jpg'

const Artifact = () => {
  const [artifact, setArtifact] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [personalExhibitName, setPersonalExhibitName] = useState("");
  const [personalExhibitList, setPersonalExhibitList] = useState([]);
  const { artifact_id } = useParams();
  const { artworkId } = useParams();
  const { state } = useLocation();
  const collection = state.selectedCollection;
  const iiif = state.iiif;
  const image_id = state?.image_id;
  
 console.log('logging collection state in artifact page', collection)

  useEffect(() => {
    if (collection === "Metropolitan Museum") {
      setIsLoading(true);
      getObjectById(artifact_id)
        .then((artifactData) => {
          setArtifact(artifactData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error getting artifact:", error.message);
          setIsLoading(false);
        });
    } else {
      const fetchArtwork = async () => {
        try {
          setIsLoading(true);
          const artPiece = await getArtworkById(artworkId);
          setArtifact(artPiece.data);
        } catch (error) {
          console.error("Error getting art piece:", error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchArtwork();
    }
  }, [artifact_id, artworkId, collection]);

  useEffect(() => {
    const savedPersonalExhibits = JSON.parse(localStorage.getItem("exhibits")) || {};
    setPersonalExhibitList(Object.keys(savedPersonalExhibits));
  }, [personalExhibitName]);

  const handleSaveClick = () => {
    if (!personalExhibitName) {
      alert("Please select or create a collection.");
      return;
    }
    const saved = handleSaveToExhibit(artifact, personalExhibitName, collection);
    if (saved) {
      alert(`Saved to exhibit: ${personalExhibitName}`);
      setPersonalExhibitName("");
    }
  };

  const handleCreateExhibit = () => {
    const newPersonalExhibitName = prompt("Enter a name for your new exhibition");
    if (newPersonalExhibitName && createPersonalExhibit(newPersonalExhibitName)) {
      setPersonalExhibitList((prevList) => [...prevList, newPersonalExhibitName]);
      setPersonalExhibitName(newPersonalExhibitName);
    }
  };

  if (isLoading) {
    return <p>Loading artifact...</p>;
  }

  if (!artifact) {
    return <p>No artifact found.</p>;
  }

  
  const fullImageUrl = image_id
    ? `${iiif}/${image_id}/full/843,/0/default.jpg`
    : `${iiif}/${artifact.image_id}/full/843,/0/default.jpg`;

  console.log('Logging full imageurl constructed in artifact', fullImageUrl);

  return (
    <div className="container">
      <Header />
      
      <div className="mt-5"> 
        {collection === "Metropolitan Museum" ? (
          <div className="text-center">
            <h1 className="mb-4">{artifact.title || "Untitled"}</h1> 
            <img
              src={
                artifact.primaryImage ||
                artifact.primaryImageSmall ||
                placeHolder
              }
              alt={artifact.title || "Untitled"}
              className="img-fluid artifact-img mb-4" 
            />
            
            {artifact.additionalImages && artifact.additionalImages.length > 0 && (
              <div className="additional-images-section mt-4 mb-4">
                <h3>More Images</h3>
                <div id="additionalImagesCarousel" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {artifact.additionalImages.map((imgUrl, index) => (
                      <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <img
                          src={imgUrl}
                          alt={`${artifact.title || "Untitled"} (Additional ${index + 1})`}
                          className="d-block small-artifact-img"
                        />
                      </div>
                    ))}
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#additionalImagesCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#additionalImagesCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            )}
  
            <div className="mt-4 mb-4">
              {artifact.culture ? <p>Culture: {artifact.culture}</p> : null}
              <p>Artist: {artifact.artistDisplayName || "unknown"}</p>
              {artifact.artistDisplayBio ? <p>{artifact.artistDisplayBio}</p> : null}
              <p>Medium: {artifact.medium}</p>
              <p>Period date: {artifact.objectDate}</p>
              <p>Acquired by: {artifact.creditLine}</p>
            </div>
  
          </div>
        ) : (
          <div className="text-center">
            <h1 className="mb-4">{artifact.title || "Untitled"}</h1>
            <img
              src={fullImageUrl || placeHolder}
              alt={artifact.title || "Untitled"}
              className="img-fluid artifact-img mb-4"
              onError={(e) => e.target.src = placeHolder}
            />
            
            <div className="mt-4 mb-4">
              {artifact.culture_title ? <p>Culture: {artifact.culture_title}</p> : null}
              <p>Artist: {artifact.artist_title || "Unknown"}</p>
              {artifact.artist_display ? (<p>Artist details: {artifact.artist_display}</p>) : null}
              <p>Medium: {artifact.medium_display}</p>
              {artifact.date_start ? (
                <p>Period date: {artifact.date_start} - {artifact.date_end}</p>
              ) : null}
              <p>{artifact.description || "No description currently available."}</p>
              <p>Acquired by: {artifact.credit_line}</p>
              <p>History of ownership: {artifact.provenance_text}</p>
            </div>
          </div>
        )}
  
        <div className="mt-5 mb-5 text-center">
          <h3>Save to Personal Exhibition</h3>
          <select
            className="form-select d-inline-block w-auto mb-2"
            value={personalExhibitName}
            onChange={(event) => setPersonalExhibitName(event.target.value)}
          >
            <option value="">Select a Personal Exhibit</option>
            {personalExhibitList.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <div>
          <button className="btn btn-primary custom-btn me-2" onClick={handleSaveClick}>
  Save to Collection
</button>

<button className="btn btn-secondary" onClick={handleCreateExhibit}>
  Create a New Personal Exhibit
</button>

          </div>
        </div>
  
        <Footer selectedCollection={collection} />
      </div>
    </div>
  );
  
};

export default Artifact;
