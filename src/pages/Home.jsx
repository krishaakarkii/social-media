import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/AuthContext"; // User Context
import "./Home.css";

const Home = () => {
  const { user } = useContext(AuthContext); // Get user data from context
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [posts, setPosts] = useState([]);

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("media", file);
    formData.append("caption", caption);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      fetchPosts();
      setFile(null);
      setCaption("");
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      {/* Upload Section */}
      <div className="upload-section">
        <div className="upload-header">
          <img

            src={user?.profileImage
                  ? `http://localhost:5000/${user.profileImage}`
                  : "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="user-avatar"
          />


          <input
            type="text"
            className="upload-input"
            placeholder={`What's on your mind, ${user?.username}?`}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="upload-actions">
          <label htmlFor="file-upload" className="upload-action-item">
            <i className="fas fa-image"></i>
            <span>Photo/video</span>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              accept="image/*,video/*"
              style={{ display: "none" }}
            />
          </label>
          <button type="submit" className="post-button" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>

      {/* Feed Section */}
      <div className="feed-section">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            avatar={post.userAvatar}
            username={post.username}
            timestamp={post.timestamp}
            content={post.image}
            caption={post.caption}
            onLike={() => console.log(`Liked post ${post._id}`)}
            onComment={() => console.log(`Comment on post ${post._id}`)}
            onShare={() => console.log(`Share post ${post._id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
