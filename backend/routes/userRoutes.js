const express = require('express');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

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

module.exports = router;
