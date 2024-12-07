const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Social Media Backend Running');
});

// API Routes
app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);
app.use('/api/posts', postRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
