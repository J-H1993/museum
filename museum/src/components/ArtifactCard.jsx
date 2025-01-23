import {Link} from 'react-router-dom'

const ArtifactCard = ({artifact, artwork, imageUrl, selectedCollection}) => {
    

    console.log(imageUrl)
    if(selectedCollection === 'Metropolitan Museum'){
        const { objectID, title, primaryImageSmall, primaryImage } = artifact
        return (
            <div className='card h-100'>
                <Link to={`/artifact/${objectID}`}>
                    <img 
                        src={primaryImageSmall || primaryImage ||'placeholder.jpg'}
                        className='card-img-top'
                        alt={title || 'Untitled'}
                    />
                    <div className='card-body'>
                    <h3 className='card-title'>{title || 'Untitled'}</h3>
                    </div>
                    
                </Link>
            </div>
            ) 
    } else{
        return (
            <div className='card h-100'>
                <img src={imageUrl} alt={artwork.title} className='card-img-top'/>
                <h3>{artwork.title || 'untitled'}</h3>
            </div>
        ) 
    }
        
    
}

export default ArtifactCard