import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.jpg" alt="Matatu Culture Logo" />
        </Link>

        <button className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          {/* Hamburger icon (you can use an SVG or an icon library) */}
          <svg viewBox="0 0 100 80" width="30" height="30">
            <rect width="100" height="10"></rect>
            <rect y="30" width="100" height="10"></rect>
            <rect y="60" width="100" height="10"></rect>
          </svg>
        </button>

        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/shop" className={`nav-link ${location.pathname === '/shop' ? 'active' : ''}`}>
            Shop
          </Link>
          <Link to="/groove-trips" className={`nav-link ${location.pathname === '/groove-trips' ? 'active' : ''}`}>
            Groove Trips
          </Link>
          <Link to="/gallery" className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}>
            Gallery
          </Link>
          <Link to="/hire" className="nav-button">
            Hire a Matatu
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
