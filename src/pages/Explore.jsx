import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Explore.css";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts/trending");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div className="explore-container">
      <h2 className="explore-title">Explore Trending Posts</h2>
      <div className="explore-grid">
        {posts.map((post) => (
          <div key={post._id} className="explore-card">
            <img src={post.imageUrl} alt={post.caption} className="explore-image" />
            <div className="explore-info">
              <p className="explore-caption">{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
