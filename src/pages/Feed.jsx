import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import axios from 'axios';
import './Feed.css';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the backend
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data); // Assuming the response data is an array of posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <h2>Feed</h2>
      {posts.map((post) => (
    <PostCard
    key={post._id} // Use a unique identifier for the key
    avatar={post.userAvatar}
    username={post.username}
    timestamp={post.timestamp}
    content={post.imageUrl}
    onLike={() => console.log(`Liked post ${post._id}`)}
    onComment={() => console.log(`Comment on post ${post._id}`)}
    onShare={() => console.log(`Share post ${post._id}`)}
  />
))}

    </div>
  );
};

export default Feed;
