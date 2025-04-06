import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/navbar.css";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <h1>Dima</h1>
          </Link>
        </div>

        <div className={`mobile-menu-icon ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/cart" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              Cart
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
          </li>
          
          {token ? (
            <>
              <li className="navbar-item">
                <Link to="/account-settings" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                  Account
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/signup" className="navbar-link signup-link" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;