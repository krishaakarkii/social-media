import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleNotificationChange = () => {
    setNotifications(!notifications);
  };

  const handleSave = () => {
    // Save settings to backend or localStorage
    console.log({
      theme,
      notifications,
    });
    alert("Settings saved!");
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <div className="settings-section">
        <h3>Profile Information</h3>
        <form className="profile-form">
          <label>
            Name:
            <input type="text" placeholder="Enter your name" />
          </label>
          <label>
            Email:
            <input type="email" placeholder="Enter your email" />
          </label>
          <label>
            Password:
            <input type="password" placeholder="Enter new password" />
          </label>
        </form>
      </div>
      <div className="settings-section">
        <h3>Preferences</h3>
        <label>
          Theme:
          <select value={theme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <label>
          Notifications:
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationChange}
          />
        </label>
      </div>
      <div className="settings-section">
        <h3>Account</h3>
        <button className="delete-account">Delete Account</button>
      </div>
      <button className="save-button" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
};

export default Settings;
