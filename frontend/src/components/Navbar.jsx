import "../features/faceExpressions/styles/navbar.scss";

const Navbar = ({ username, onLogout }) => {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div className="navbar__brand-mark">V</div>
        <div>
          <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div>VIZO</div>
            <div className="navbar__subtitle">Face-driven music player</div>
          </a>
        </div>
      </div>

      <div className="navbar__right">
        {username && (
          <div className="navbar__user">
            <span className="navbar__username">{username}</span>
          </div>
        )}

        {onLogout && (
          <button onClick={onLogout} className="navbar__logout-btn">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
