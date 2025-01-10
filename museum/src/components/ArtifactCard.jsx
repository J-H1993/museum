import {Link} from 'react-router-dom'

const ArtifactCard = ({artifact}) => {
    const {objectID, title, primaryImageSmall, primaryImage} = artifact

    return(
        <div className='artifactCard'>
            <Link to={`/artifact/${objectID}`}>
                <img 
                    src={primaryImageSmall || primaryImage ||'placeholder.jpg'}
                    alt={title || 'Untitled'}
                />
                <h2>{title || 'Untitled'}</h2>
            </Link>
        </div>
    )
}

export default ArtifactCard