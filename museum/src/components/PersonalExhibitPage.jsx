import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePersonalExhibit } from "./PersonalExhibitonStorage";

const ListOfPersonalExhibits = ({ onExhibitSelected }) => {
  const [personalExhibits, setPersonalExhibits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExhibits = () => {
      const savedPersonalExhibits =
        JSON.parse(localStorage.getItem("exhibits")) || {};
      setPersonalExhibits(Object.keys(savedPersonalExhibits));
    };

    fetchExhibits();

    window.addEventListener("exhibitUpdated", fetchExhibits);
    window.addEventListener("storage", fetchExhibits);

    return () => {
      window.removeEventListener("exhibitUpdated", fetchExhibits);
      window.removeEventListener("storage", fetchExhibits);
    };
  }, []);

  const handleDeleteExhibit = (exhibitName) => {
    if (deletePersonalExhibit(exhibitName)) {
      setPersonalExhibits((prevExhibits) =>
        prevExhibits.filter((name) => name !== exhibitName)
      );
    }
  };

  const handleExhibitClick = (exhibitName) => {
    onExhibitSelected(exhibitName);
    navigate(`/?personalExhibit=${exhibitName}`);
  };

  return (
    <div>
      <h2>Your Personal Exhibitions</h2>
      {personalExhibits.length === 0 ? (
        <p>No Personal Exhibitions found. Create one to get started!</p>
      ) : (
        <div className="card-deck">
          {personalExhibits.map((exhibitName) => (
            <div
              key={exhibitName}
              className="card"
              onClick={() => handleExhibitClick(exhibitName)}
            >
              <div className="card-body">
                <h3>{exhibitName}</h3>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteExhibit(exhibitName);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListOfPersonalExhibits;
