import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Social Circle</div>
      <div className="search-bar">
        <input type="text" placeholder="Search for your friend..." className="search-input" />
        <button className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
