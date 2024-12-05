import React from "react";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="profile-container">
      {/* Top Section */}
      <div className="profile-header">
        <div className="profile-picture">
          <img
            src="https://via.placeholder.com/150" // Replace with actual image source
            alt="Profile"
          />
        </div>
        <div className="profile-info">
          <h1>Username</h1>
          <p className="bio">Coffee enthusiast. Latte art lover. ☕</p>
          <button className="edit-button">Edit Profile</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="profile-stats">
        <div>
          <span className="stat-number">120</span>
          <span className="stat-label">Posts</span>
        </div>
        <div>
          <span className="stat-number">300</span>
          <span className="stat-label">Followers</span>
        </div>
        <div>
          <span className="stat-number">180</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      {/* Posts Section */}
      <div className="profile-posts">
        <h2>Your Posts</h2>
        <div className="post-grid">
          {/* Mock posts */}
          {[1, 2, 3, 4, 5, 6].map((post, index) => (
            <div key={index} className="post-card">
              <img
                src="https://via.placeholder.com/150"
                alt="Post"
                className="post-image"
              />
              <div className="post-details">Caption or details here...</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
