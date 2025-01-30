import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePersonalExhibit from '../components/CreatePersonalExhibit';
import ListOfPersonalExhibits from '../components/PersonalExhibitPage';
import Header from '../components/Header';

const ManagePersonalExhibitsPage = () => {
    const [selectedPersonalExhibit, setSelectedPersonalExhibit] = useState(null);
    const navigate = useNavigate();

    const personalExhibitClear = () => {
        setSelectedPersonalExhibit(null);
    };

    const handleExhibitSelection = (exhibitName) => {
        setSelectedPersonalExhibit(exhibitName);
        navigate(`/?personalExhibit=${exhibitName}`)
    };

    return (
        <div>
            <Header />
            <h1>Select Your Exhibition</h1>
            <CreatePersonalExhibit onPersonalExhibitCreated={personalExhibitClear} />
            <ListOfPersonalExhibits onExhibitSelected={handleExhibitSelection} />
        </div>
    );
};

export default ManagePersonalExhibitsPage;

