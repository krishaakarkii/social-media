import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import { AuthContext } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [posts, setPosts] = useState([]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile); // Debugging log
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit button clicked"); // Debugging log
    console.log("Caption:", caption); // Debugging log
    console.log("File:", file); // Debugging log

    if (!file || !caption) {
      console.error("File or caption is missing"); // Log if input is invalid
      alert("Please add a file and caption before posting!");
      return;
    }

    const formData = new FormData();
    formData.append('media', file);
    formData.append('caption', caption);

    try {
      console.log("Sending POST request to server..."); // Debugging log
      const response = await axios.post(
        'http://localhost:5000/api/posts/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log("Post created successfully:", response.data); // Debugging log
      setPosts([response.data.post, ...posts]); // Add new post to the top
      setFile(null);
      setCaption('');
    } catch (error) {
      console.error("Error uploading post:", error.response?.data || error.message); // Debugging log
      alert("Failed to upload the post. Please try again.");
    }
  };

  const fetchPosts = async () => {
    console.log("Fetching posts from the server..."); // Debugging log
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      console.log("Posts fetched successfully:", response.data); // Debugging log
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error.message); // Debugging log
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
            src={
              user?.profileImage
                ? `http://localhost:5000/${user.profileImage}`
                : 'https://via.placeholder.com/40'
            }
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
              style={{ display: 'none' }}
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
            avatar={
              post.userId?.profileImage
                ? `http://localhost:5000/${post.userId.profileImage}`
                : "https://via.placeholder.com/40"
            }
            username={post.userId?.username || "Unknown User"}
            timestamp={new Date(post.createdAt).toLocaleString()}
            content={post.image ? `http://localhost:5000/${post.image}` : ""}
            caption={post.caption}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
