import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {getObjectById} from '../utils/api'


const Artifact = () =>{
    const [artifact, setArtifact] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const {artifact_id} = useParams()

    useEffect(()=>{
        setIsLoading(true)
        getObjectById(artifact_id)
        .then((artifactData)=>{
            setArtifact(artifactData)
            setIsLoading(false)
        })
        .catch((error)=>{
            console.error('Error getting artifact', error.message)
            setIsLoading(false)
        })
    }, [artifact_id])

    if(isLoading){
        return <p>Loading artifact...</p>
    }

    if(!artifact){
        return <p>No artifact found.</p>
    }

    return (
        <div>
            <h1>{artifact.title || 'Untitled'}</h1>
            <img
                src={artifact.primaryImage || artifact.primaryImageSmall || 'placeholder.jpg'}
                alt={artifact.title ||'Untitled'}
            />
            {artifact.additionalImages && artifact.additionalImages.length > 0 && (
        <div className="additional-images-section">
          <h3>More Images</h3>
          {artifact.additionalImages.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`${artifact.title || 'Untitled'} (Additional ${index + 1})`}
              className="additional-image"
            />
          ))}
        </div>
      )}
            {artifact.culture?<p>Culture: {artifact.culture}</p>:null}
            <p>Artist:{artifact.artistDisplayName || 'unknown'}</p>

            {artifact.artistDisplayBio? <p>{artifact.artistDisplayBio}</p>:null}
            <p>Medium: {artifact.medium}</p>
            <p>Period date: {artifact.objectDate}</p>
            <p>Aquired by: {artifact.creditLine}</p>
        </div>
    )
}

export default Artifact
