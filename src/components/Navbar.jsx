import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">Social Circle</div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for your friend..."
          className="search-input"
        />
        <button className="search-button">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="auth-section">
        {user ? (
          <div className="user-controls">
            <span className="user-welcome">Hello, {user.username}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
