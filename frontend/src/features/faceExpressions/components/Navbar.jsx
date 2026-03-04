import "../styles/navbar.scss";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <div className="navbar__brand-mark">V</div>
        <div>
          <div>VIZO</div>
          <div className="navbar__subtitle">Face-driven music player</div>
        </div>
      </div>

      <div className="navbar__right">
        <div className="navbar__indicator">
          <span className="navbar__indicator-dot" />
          <span>Camera active</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
