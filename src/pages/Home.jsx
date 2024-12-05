import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [caption, setCaption] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTagInput = (event) => {
    if (event.key === "Enter" && event.target.value) {
      setTags([...tags, event.target.value]);
      event.target.value = ""; // Clear the input
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ file, tags, caption });
  };

  return (
    <div className="home-container">
      <div className="upload-card">
        <h2>Share Your Coffee Design</h2>
        <p>What have you been working on? Showcase your creativity!</p>
        <form onSubmit={handleSubmit}>
          <div className="upload-section">
            <label htmlFor="file-upload" className="upload-label">
              <span className="upload-icon">⬆</span>
              <span>
                {file ? file.name : "Upload an image or video (max 4MB)"}
              </span>
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              accept="image/*,video/*"
              hidden
            />
          </div>



          <div className="caption-section">
            <textarea
              placeholder="Write your caption here..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">
              Share Now
            </button>
            <button type="button" className="draft-button">
              Save as Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
