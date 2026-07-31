// Task Model
// Defines the schema for tasks stored in MongoDB

const mongoose = require('mongoose');

/**
 * Task Schema Definition
 * Stores task information with timestamp
 */
const taskSchema = new mongoose.Schema(
  {
    // Task description text - required field
    text: {
      type: String,
      required: [true, 'Please provide task text'], // Validation message if empty
      trim: true, // Removes whitespace from both ends
      maxlength: [500, 'Task text cannot exceed 500 characters'],
    },
    // Optional completed status for checkbox support
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
