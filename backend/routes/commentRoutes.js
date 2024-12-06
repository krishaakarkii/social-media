const express = require('express');
const Comment = require('../models/Comment');
const verifyToken = require('../middleware/verifyToken'); // Import the middleware
const router = express.Router();

// Create a Comment
router.post('/:postId', verifyToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    // Create a new comment
    const newComment = new Comment({
      postId,
      userId: req.user.userId, // Extracted from the verified token
      text,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comment', error: error.message });
  }
});

module.exports = router;
