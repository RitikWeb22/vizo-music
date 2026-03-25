import { Link } from "react-router-dom";
import "../features/faceExpressions/styles/navbar.scss";

const Navbar = ({ username, onLogout }) => {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div className="navbar__brand-mark">V</div>
        <div>
          <Link to="/" className="navbar__brand-link">
            <span className="navbar__title">Moodify</span>
            <span className="navbar__subtitle">Face-driven music</span>
          </Link>
        </div>
      </div>

      <div className="navbar__right">
        {username && (
          <>
            <Link to="/favorites" className="navbar__upload-link">
              Favorites
            </Link>
            <Link to="/upload" className="navbar__upload-link">
              Upload
            </Link>
            <div className="navbar__user">
              <span className="navbar__username">{username}</span>
            </div>
            {onLogout && (
              <button onClick={onLogout} className="navbar__logout-btn">
                Logout
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
