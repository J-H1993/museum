import { Link } from "react-router-dom";

const Footer = ({ selectedCollection }) => {
  return (
    <footer className="footer full-width-footer">
      <div className="container-fluid text-center">
        <h3 className="footer-heading">About Collection:</h3>

        {selectedCollection === 'Personal Exhibits' ? (
          <>
            <p>Your own personal exhibition of artworks</p>
            <p className="footer-text">
              This collection has kindly been made available by the{" "}
              <Link to="https://www.metmuseum.org/art/collection" className="footer-link">
                Metropolitan Museum
              </Link>{" "}
              and the{" "}
              <Link to="https://www.artic.edu/" className="footer-link">
                Art Institute Of Chicago
              </Link>{" "}
              websites.
            </p>
          </>
        ) : (
          <>
            <h3 className="footer-heading">
              For more information about the {selectedCollection} please visit their{" "}
              {selectedCollection === "Art Institute Of Chicago" ? (
                <Link to={"https://www.artic.edu/"} className="footer-link">
                  website
                </Link>
              ) : (
                <Link
                  to={"https://www.metmuseum.org/art/collection"}
                  className="footer-link"
                >
                  website
                </Link>
              )}
              .
            </h3>
            <p className="footer-text">
          This collection has kindly been made available by the{" "}
          {selectedCollection}.
        </p>
          </>
        )}

        
      </div>
    </footer>
  );
};

export default Footer;
