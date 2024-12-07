import React from "react";
import "./PostCard.css";

const PostCard = ({ avatar, username, timestamp, content, caption }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <img src={avatar} alt="User Avatar" className="post-avatar" />
        <div>
          <h4>{username}</h4>
          <p>{timestamp}</p>
        </div>
      </div>
      <p>{caption}</p>
      {content && <img src={content} alt="Post Content" className="post-image" />}
    </div>
  );
};

export default PostCard;
