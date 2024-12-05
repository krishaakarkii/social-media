import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 p-4">
      <div className="logo">Social App</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
    </nav>
  );
};

export default Navbar;
