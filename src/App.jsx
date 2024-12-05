import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Login from './pages/Login';
import './App.css'; // Global CSS for the grid layout

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="layout">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <aside className="widgets">
            <div className="widget-card">Suggested Groups</div>
            <div className="widget-card">Suggested Friends</div>
          </aside>
        </div>
      </div>
    </Router>
  );
};

export default App;
