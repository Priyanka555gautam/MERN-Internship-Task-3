// Database Configuration File
// This file handles the connection to MongoDB Atlas using Mongoose

const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas Database
 * Uses environment variables for connection string
 * Includes error handling and console logging
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the MONGO_URI environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log successful connection with database name
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // Log connection error and exit process with failure code
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the application if database connection fails
  }
};

module.exports = connectDB;
