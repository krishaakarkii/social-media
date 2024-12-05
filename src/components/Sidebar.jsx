import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="menu">
        <li>Discover</li>
        <li>Trending</li>
        <li>Groups</li>
        <li>Pages</li>
        <li>Bookmarks</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
