const express = require('express');
const Post = require('../models/Post');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const router = express.Router();



// Multer Configuration
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
  }),
  limits: { fileSize: 90 * 1024 * 1024 }, // Set file size limit to 10 MB
});

// Post Create Route
router.post('/create', verifyToken, upload.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File too large or invalid file type' });
    }
    const { caption, tags } = req.body;
    const newPost = new Post({
      userId: req.user.userId,
      image: `/uploads/${req.file.filename}`,
      caption,
      tags: tags ? tags.split(',') : [],
    });
    const savedPost = await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: savedPost });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error: error.message });
  }
});

// Get all posts
// Get all posts
router.get('/', async (req, res) => {
  try {
    // Populate userId to fetch user details like username and profileImage
    const posts = await Post.find().populate('userId', 'username profileImage');
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
