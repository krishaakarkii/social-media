const express = require('express');
const mongoose = require('mongoose'); // Add this import at the top
const User = require('../models/User');
const Post = require('../models/Post');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../middleware/uploadConfig');
const router = express.Router();

// Upload avatar
router.post('/upload-avatar', verifyToken, upload.single('avatar'), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profileImage = req.file.path; // Save the file path to the user's profile
    await user.save();

    res.status(200).json({ message: 'Avatar uploaded successfully', avatar: user.profileImage });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload avatar', error: error.message });
  }
});

// Follow a User
router.put('/:userId/follow', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user.userId) {
      return res.status(400).json({ message: "You can't follow yourself" });
    }

    const userToFollow = await User.findById(userId);
    const currentUser = await User.findById(req.user.userId);

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!userToFollow.followers.includes(req.user.userId)) {
      userToFollow.followers.push(req.user.userId);
      currentUser.following.push(userId);
      await userToFollow.save();
      await currentUser.save();
      res.status(200).json({ message: 'User followed successfully' });
    } else {
      res.status(400).json({ message: 'You are already following this user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to follow user', error: error.message });
  }
});

// Unfollow a User
router.put('/:userId/unfollow', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user.userId) {
      return res.status(400).json({ message: "You can't unfollow yourself" });
    }

    const userToUnfollow = await User.findById(userId);
    const currentUser = await User.findById(req.user.userId);

    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    userToUnfollow.followers = userToUnfollow.followers.filter((id) => id.toString() !== req.user.userId);
    currentUser.following = currentUser.following.filter((id) => id.toString() !== userId);
    await userToUnfollow.save();
    await currentUser.save();
    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to unfollow user', error: error.message });
  }
});

// Get user profile by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.find({ userId: id });
    res.status(200).json({ ...user._doc, posts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Search for Users
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    const users = await User.find({ username: { $regex: query, $options: 'i' } })
      .select('_id username profileImage');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
});

//profile updates
router.put('/:id', verifyToken, upload.single('avatar'), async (req, res) => {
  try {
    const { id } = req.params;
    if (id !== req.user.userId) {
      return res.status(403).json({ message: 'You can only update your own profile' });
    }

    const updatedFields = {};
    if (req.body.username) updatedFields.username = req.body.username;
    if (req.body.bio) updatedFields.bio = req.body.bio;
    if (req.file) updatedFields.profileImage = req.file.path; // Store avatar file path

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (id !== req.user.userId) {
      return res.status(403).json({ message: 'You can only update your own account' });
    }

    const updatedFields = {};
    if (req.body.email) updatedFields.email = req.body.email;
    if (req.body.password) {
      // Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
});



module.exports = router;
