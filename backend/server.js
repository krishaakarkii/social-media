const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Custom MongoDB connection logic
const path = require('path'); // Required to serve static files
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes'); // Routes for user operations

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB(); // Ensure the `connectDB` function connects to the MongoDB database

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5173', // Vite dev server URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies and credentials
}));

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files (e.g., images)

// Test route (to verify server is running)
app.get('/', (req, res) => {
  res.send('Social Media Backend Running');
});

// API Routes
app.use('/auth', authRoutes); // Authentication routes (e.g., login, register)
app.use('/comments', commentRoutes); // Comment-related routes
app.use('/api/posts', postRoutes); // Post-related routes
app.use('/users', userRoutes); // User-related routes (e.g., follow, profile)

// Error handling middleware (optional, for better error reporting)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error details
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Port setup
const PORT = process.env.PORT || 5000; // Use environment variable or fallback to 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
