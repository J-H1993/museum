import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import ArtInstituteGallery from '../components/ArtInstituteGallery';
import SelectCollection from '../components/SelectCollection';
import MetArtifactFilter from '../components/MetArtifactFilter';
import ArtInstituteFilter from '../components/ArtInstituteFilter';
import PersonalExhibitItems from '../components/PersonalExhibitItems'; 

const Home = () => {
    const [pageNo, setPageNo] = useState(1);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedExhibition, setSelectedExhibition] = useState('');
    const [collection, setCollection] = useState('Art Institute Of Chicago');
    const [selectedPersonalExhibit, setSelectedPersonalExhibit] = useState(null); 
    const [totalGallerySize, setTotalGallerySize] = useState(0);
    const [personalExhibitLoaded, setPersonalExhibitLoaded] = useState(false); 

    const location = useLocation(); 

    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const exhibitName = params.get('personalExhibit');
        if (exhibitName) {
            setCollection('Personal Exhibits')
            setSelectedPersonalExhibit(exhibitName); 
            setPersonalExhibitLoaded(true); 
        }else{
            setCollection('Art Institute Of Chicago')
        }
    }, [location]);

    const itemsPerPage = 6;

    const handlePageForwardClick = () => {
        setPageNo((prevPageNo) => prevPageNo + 1);
    };

    const handlePageBackClick = () => {
        setPageNo((prevPageNo) => prevPageNo - 1);
    };

    const disableNextButton = pageNo >= Math.ceil(totalGallerySize / 6);

   
    const handleCollectionChange = (newCollection) => {
        setCollection(newCollection);
        setSelectedPersonalExhibit(null); 
        setPersonalExhibitLoaded(false); 
    };

    return (
        <>
            <Header />
            <SelectCollection
                collection={collection}
                setCollection={handleCollectionChange} 
                setSelectedPersonalExhibit={setSelectedPersonalExhibit}
            />

           
            {selectedPersonalExhibit && personalExhibitLoaded ? (
                <PersonalExhibitItems personalExhibitName={selectedPersonalExhibit} />
            ) : (
            
                <>
                    {collection === 'Metropolitan Museum' && (
                        <>
                            <MetArtifactFilter
                                selectedDepartment={selectedDepartment}
                                setSelectedDepartment={setSelectedDepartment}
                            />
                            <Gallery
                                page={pageNo}
                                pageSize={itemsPerPage}
                                selectedDepartment={selectedDepartment}
                                selectedCollection={collection}
                                setTotalGallerySize={setTotalGallerySize}
                            />
                        </>
                    )}

                    {collection === 'Art Institute Of Chicago' && (
                        <>
                            <ArtInstituteFilter
                                selectedExhibition={selectedExhibition}
                                setSelectedExhibition={setSelectedExhibition}
                            />
                            <ArtInstituteGallery
                                page={pageNo}
                                pageSize={itemsPerPage}
                                selectedExhibition={selectedExhibition}
                                setTotalGallerySize={setTotalGallerySize}
                            />
                        </>
                    )}
                </>
            )}

            <button onClick={handlePageForwardClick} disabled={disableNextButton}>
                Next
            </button>
            <button onClick={handlePageBackClick} disabled={pageNo === 1}>
                Previous
            </button>
        </>
    );
};

export default Home;
