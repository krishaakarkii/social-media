const express = require('express');
const Post = require('../models/Post');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Create a Post
router.post('/', verifyToken, async (req, res) => {
  try {
    const { image, caption, tags } = req.body;

    const newPost = new Post({
      userId: req.user.userId,
      image,
      caption,
      tags,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
});

//get post
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username'); // Adjust as needed
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
  }
});


// Like a Post
router.put('/:postId/like', verifyToken, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.likes.includes(req.user.userId)) {
      post.likes.push(req.user.userId);
      await post.save();
      res.status(200).json({ message: 'Post liked successfully', likes: post.likes });
    } else {
      res.status(400).json({ message: 'You have already liked this post' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to like post', error: error.message });
  }
});

// Unlike a Post
router.put('/:postId/unlike', verifyToken, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.likes = post.likes.filter((userId) => userId.toString() !== req.user.userId);
    await post.save();
    res.status(200).json({ message: 'Post unliked successfully', likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to unlike post', error: error.message });
  }
});

module.exports = router;
