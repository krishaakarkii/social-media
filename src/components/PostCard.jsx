import React from "react";
import "./PostCard.css";

const PostCard = ({ avatar, username, timestamp, content, onLike, onComment, onShare }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <img className="avatar" src={avatar} alt={`${username}'s avatar`} />
        <div>
          <p className="username">{username}</p>
          <p className="timestamp">{new Date(timestamp).toLocaleString()}</p>
        </div>
      </div>
      <div className="post-content">
        <img src={content} alt="Post Content" />
      </div>
      <div className="post-actions">
        <button className="action-btn like-btn" onClick={onLike}>
          <i className="fas fa-heart"></i> Like
        </button>
        <button className="action-btn comment-btn" onClick={onComment}>
          <i className="fas fa-comment"></i> Comment
        </button>
        <button className="action-btn share-btn" onClick={onShare}>
          <i className="fas fa-share"></i> Share
        </button>
      </div>
    </div>
  );
};

export default PostCard;
