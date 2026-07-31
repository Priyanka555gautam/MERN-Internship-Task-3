// Express Server Setup
// Main entry point for the backend application
// Initializes Express app, connects to MongoDB, and starts server

// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import task routes
const taskRoutes = require('./routes/taskRoutes');

// Initialize Express application
const app = express();

// Connect to MongoDB Atlas
connectDB();

// ==================== MIDDLEWARE ====================

/**
 * CORS Middleware
 * Allows requests from frontend running on different port
 * Enables cross-origin resource sharing
 */
app.use(cors());

/**
 * Body Parser Middleware
 * Parses incoming JSON request bodies
 * Limits payload to 10mb
 */
app.use(express.json({ limit: '10mb' }));

/**
 * URL Encoded Middleware
 * Parses incoming URL-encoded request bodies
 */
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ==================== ROUTES ====================

/**
 * Mount task routes
 * All task-related endpoints are prefixed with /api
 */
app.use('/api', taskRoutes);

/**
 * Health Check Endpoint
 * Returns server status
 */
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

/**
 * 404 Handler
 * Handles requests to non-existent endpoints
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ==================== ERROR HANDLING ====================

/**
 * Global Error Handler
 * Catches any unhandled errors and sends appropriate response
 */
app.use((err, req, res, next) => {
  console.error('Global Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// ==================== SERVER INITIALIZATION ====================

// Get port from environment variable or use default
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
