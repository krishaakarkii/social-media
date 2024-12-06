import React, { useState } from "react";
import axios from "axios";
import "./EditProfile.css";

const EditProfile = ({ user, onClose, onProfileUpdated }) => {
  const [username, setUsername] = useState(user.username || "");
  const [bio, setBio] = useState(user.bio || "");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    user.profileImage || "https://via.placeholder.com/150"
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Show preview of the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    if (profileImage) {
      formData.append("avatar", profileImage);
    }

    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const response = await axios.put(
        `http://localhost:5000/users/${user._id}`, // Backend route
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
      onProfileUpdated(response.data); // Notify parent with the updated profile
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };

  return (
    <div className="edit-profile-modal">
      <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="avatar-preview">
            <img
              src={previewImage}
              alt="Avatar Preview"
              className="avatar-image"
            />
            <label className="upload-button">
              Change Avatar
              <input type="file" onChange={handleFileChange} hidden />
            </label>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="3"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
