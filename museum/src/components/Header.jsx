import { Link } from "react-router-dom";
import '../App.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/collections">
          Manage Personal Exhibitions
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/">
              Return to Gallery
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;



