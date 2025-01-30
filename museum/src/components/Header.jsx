import { Link } from "react-router-dom"

const Header = () => {
    return (
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to='/collections'>
                Manage Personal Exhibitions
            </Link>
            <div className="navbar-nav">
                <Link className="nav-item nav-link" to='/'>
                    Return to Gallery
                </Link>
            </div>
            
        </div>
     </nav>

    )

}

export default Header