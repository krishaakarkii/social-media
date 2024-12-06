import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Profile.css";
import EditProfile from "../components/EditProfile"; // Import the new component

const Profile = () => {
  const { user, setUser } = useContext(AuthContext); // Access user and update function from context
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for modal

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${user._id}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleProfileUpdated = (updatedProfile) => {
    setProfileData(updatedProfile); // Update local state
    setUser((prev) => ({ ...prev, ...updatedProfile })); // Update global user in AuthContext
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profileData) {
    return <div>Error loading profile.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={`http://localhost:5000/${profileData.profileImage}`} alt="Profile" />
        </div>
        <div className="profile-info">
          <h1>{profileData.username}</h1>
          <p className="bio">{profileData.bio || "This user has no bio."}</p>
          <button onClick={() => setIsEditModalOpen(true)} className="edit-button">
            Edit Profile
          </button>
        </div>
      </div>

      <div className="profile-stats">
        <div>
          <span className="stat-number">{profileData.posts?.length || 0}</span>
          <span className="stat-label">Posts</span>
        </div>
        <div>
          <span className="stat-number">{profileData.followers?.length || 0}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div>
          <span className="stat-number">{profileData.following?.length || 0}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      <div className="profile-posts">
        <h2>Your Posts</h2>
        <div className="post-grid">
          {profileData.posts?.length > 0 ? (
            profileData.posts.map((post) => (
              <div key={post._id} className="post-card">
                <img
                  src={`http://localhost:5000/${post.image}`}
                  alt={post.caption}
                  className="post-image"
                />
                <div className="post-details">{post.caption}</div>
              </div>
            ))
          ) : (
            <p>No posts yet.</p>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <EditProfile
          user={profileData}
          onClose={() => setIsEditModalOpen(false)}
          onProfileUpdated={handleProfileUpdated}
        />
      )}
    </div>
  );
};

export default Profile;
