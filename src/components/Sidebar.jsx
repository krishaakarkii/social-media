import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="menu">
        <li>Home</li>
        <li>Feed</li>
        <li>Profile</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
