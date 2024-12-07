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

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('media', file);
    formData.append('caption', caption);

    try {
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
      setPosts([response.data.post, ...posts]); // Add new post to the top
      setFile(null);
      setCaption('');
    } catch (error) {
      console.error('Error uploading post:', error.response?.data || error.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error.response?.data || error.message);
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
