import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getObjectById } from "../utils/api";
import { getArtworkById } from "../utils/ArtInstituteOfChicago.api";
import { handleSaveToExhibit } from "../components/PersonalExhibitonStorage";
import Header from '../components/Header'

const Artifact = () => {
  const [artifact, setArtifact] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [personalExhibitName, setPersonalExhibitName] = useState("")
  const [personalExhibitList, setPersonalExhibitList] = useState([])
  const { artifact_id } = useParams();
  const {artworkId} = useParams()
  const { state } = useLocation();
  const collection = state.selectedCollection;
  const iiif = state.iiif



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

  useEffect (()=>{
    const savedPersonalExhibits = JSON.parse(localStorage.getItem("exhibits")) || {}
    setPersonalExhibitList(Object.keys(savedPersonalExhibits))
  }, [personalExhibitName])

  const handleSaveClick = () =>{
    if(!personalExhibitName){
      alert("Please select or create a collection.")
      console.log(JSON.parse(localStorage.getItem("exhibits")))
      return
    }
    const saved = handleSaveToExhibit(artifact, personalExhibitName, collection)
    if(saved){
      alert(`Saved to exhibit: ${personalExhibitName}`)
      setPersonalExhibitName("")
    }
  }

  const handleCreateExhibit = () =>{
    const newPersonalExhibitName = prompt("Enter a name for your new exhibition")
    if(newPersonalExhibitName && createPersonalExhibit(newPersonalExhibitName)){
      setPersonalExhibitList((prevList)=>[...prevList, newPersonalExhibitName])
      setPersonalExhibitName(newPersonalExhibitName)
    }
  }

  if (isLoading) {
    return <p>Loading artifact...</p>;
  }

  if (!artifact) {
    return <p>No artifact found.</p>;
  }

  const fullImageUrl = `${iiif}/${artifact.image_id}/full/843,/0/default.jpg`
  

  return (
    <div>
      <Header />
      {collection === "Metropolitan Museum" ? (
        <div>
          <h1>{artifact.title || "Untitled"}</h1>
          <img
            src={
              artifact.primaryImage ||
              artifact.primaryImageSmall ||
              "placeholder.jpg"
            }
            alt={artifact.title || "Untitled"}
          />
          {artifact.additionalImages &&
            artifact.additionalImages.length > 0 && (
              <div className="additional-images-section">
                <h3>More Images</h3>
                {artifact.additionalImages.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`${artifact.title || "Untitled"} (Additional ${
                      index + 1
                    })`}
                    className="additional-image"
                  />
                ))}
              </div>
            )}
          {artifact.culture ? <p>Culture: {artifact.culture}</p> : null}
          <p>Artist:{artifact.artistDisplayName || "unknown"}</p>

          {artifact.artistDisplayBio ? (
            <p>{artifact.artistDisplayBio}</p>
          ) : null}
          <p>Medium: {artifact.medium}</p>
          <p>Period date: {artifact.objectDate}</p>
          <p>Aquired by: {artifact.creditLine}</p>
        </div>
      ) : (
        <div>
            <h1>{artifact.title || 'Untitled'}</h1>
            <img src={fullImageUrl}
             alt={artifact.title || 'untitled'}
             />
            {artifact.culture_title ? <p>Culture: {artifact.culture_title}</p> : null}
            <p>Artist: {artifact.artist_title || 'Unknown'}</p>
            {artifact.artist_display ? (<p>Artist details: {artifact.artist_display}</p>) : null}
            <p>Medium: {artifact.medium_display}</p>
            {artifact.date_start ? (<p>Period date: {artifact.date_start} - {artifact.date_end}</p>) : null}
            {artifact.description || "No description currently available."}
            <p>Aquired by: {artifact.credit_line}</p>
            <p>History of ownership: {artifact.provenance_text}</p>
            

        </div>
      )}
       <div>
            <h3>Save to Personal Exhibition</h3>
            <select
            value={personalExhibitName}
            onChange={(event) => setPersonalExhibitName(event.target.value)}
            >
              <option value="">Select a Personal Exhibit</option>
              {personalExhibitList.map((name)=>(
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <button onClick={handleSaveClick}>Save to Collection</button>
            <button onClick={handleCreateExhibit}>Create a New Personal Exhibit</button>
          </div>
    </div>
  );
};

export default Artifact;
