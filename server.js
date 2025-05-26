// server.js
const express = require('express');
require('dotenv').config();
const connectDB = require('./utils/connectDB');

// Route imports
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Initialize app
const app = express();

// Middleware

app.use(express.json());


// Routes
app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', reviewRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Book Review API is running');
});

// DB connection
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});


