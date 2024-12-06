import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/" className="sidebar-link">
            <i className="fas fa-home"></i> Home
          </Link>
        </li>
        <li>
          <Link to="/explore" className="sidebar-link">
            <i className="fas fa-search"></i> Explore
          </Link>
        </li>
        <li>
          <Link to="/messages" className="sidebar-link">
            <i className="fas fa-envelope"></i> Messages
          </Link>
        </li>
        <li>
          <Link to="/profile" className="sidebar-link">
            <i className="fas fa-user"></i> Profile
          </Link>
        </li>
        <li>
          <Link to="/settings" className="sidebar-link">
            <i className="fas fa-cog"></i> Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
