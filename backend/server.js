const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes'); // For follow/unfollow and search

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5173', // Vite dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json()); // Middleware to parse JSON

// Test route
app.get('/', (req, res) => {
  res.send('Social Media Backend Running');
});

// Routes
app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);
app.use('/api/posts', postRoutes);
app.use('/users', userRoutes); // Register user routes

// Port setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
