import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePersonalExhibit from "../components/CreatePersonalExhibit";
import ListOfPersonalExhibits from "../components/PersonalExhibitPage";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ManagePersonalExhibitsPage = () => {
  const [selectedPersonalExhibit, setSelectedPersonalExhibit] = useState(null);
  const navigate = useNavigate();

  const personalExhibitClear = () => {
    setSelectedPersonalExhibit(null);
  };

  const handleExhibitSelection = (exhibitName) => {
    setSelectedPersonalExhibit(exhibitName);
    navigate(`/?personalExhibit=${exhibitName}`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container mt-5 flex-grow-1">
        <h1>Select Your Exhibition</h1>
        <CreatePersonalExhibit onPersonalExhibitCreated={personalExhibitClear} />
        <ListOfPersonalExhibits onExhibitSelected={handleExhibitSelection} />
      </div>
      <Footer isManagePersonalExhibitsPage={true} />
    </div>
  );
};

export default ManagePersonalExhibitsPage;


