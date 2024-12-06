import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Settings.css";

const Settings = () => {
  const { user, token } = useContext(AuthContext);

  // Initialize state with default values (handles undefined `user`)
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true); // Placeholder until backend handles preferences
  const [profileImage, setProfileImage] = useState(
    user?.profileImage || "https://via.placeholder.com/80"
  );

  // Update state if `user` changes
  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setProfileImage(`http://localhost:5000/${user.profileImage || "https://via.placeholder.com/80"}`);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const updatedData = {
        email: email,
        ...(password && { password }), // Include password only if it's not empty
      };

      await axios.put(`http://localhost:5000/users/${user._id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error.response?.data || error.message);
      alert("Failed to save settings.");
    }
  };

  if (!user) {
    // Render loading state while `user` is being fetched
    return <div>Loading user data...</div>;
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <div className="user-info">
          <img src={profileImage} alt="User Avatar" className="user-avatar" />
          <div>
            <h2>{user.username}</h2>
            <p>{email}</p>
          </div>
        </div>
      </div>

      <div className="settings-form">
        <h3>Account Settings</h3>
        <form>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a new password"
            />
          </label>
        </form>
      </div>

      <div className="settings-preferences">
        <h3>Preferences</h3>
        <div className="preference-item">
          <label>Push Notifications</label>
          <div className="toggle-switch">
            <input
              type="checkbox"
              id="notifications-toggle"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <label htmlFor="notifications-toggle"></label>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
        <button className="delete-button" onClick={() => alert("Delete Account feature coming soon!")}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
