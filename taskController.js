// Task Controller
// Contains business logic for handling task operations
// Follows MVC architecture pattern

const mongoose = require('mongoose');
const Task = require('../models/Task');

/**
 * GET /tasks
 * Retrieve all tasks from database
 * Returns tasks sorted by newest first (descending order)
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getTasks = async (req, res) => {
  try {
    // Fetch all tasks and sort by creation date (newest first)
    const tasks = await Task.find().sort({ createdAt: -1 });

    // Send successful response with tasks
    res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      data: tasks,
    });
  } catch (error) {
    // Handle errors and send error response
    console.error(`Error fetching tasks: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message,
    });
  }
};

/**
 * POST /add
 * Create a new task and save to database
 * Expects task text in request body
 * 
 * @param {Object} req - Express request object with body containing task text
 * @param {Object} res - Express response object
 */
exports.addTask = async (req, res) => {
  try {
    const { text } = req.body;

    // Validate that task text is provided and not empty
    if (!text || text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide task text',
      });
    }

    // Create new task object
    const newTask = new Task({
      text: text.trim(), // Remove leading/trailing whitespace
    });

    // Save task to database
    const savedTask = await newTask.save();

    // Send successful response with saved task
    console.log(`✅ Task added: ${savedTask._id}`);
    res.status(201).json({
      success: true,
      message: 'Task added successfully',
      data: savedTask,
    });
  } catch (error) {
    // Handle validation errors and other errors
    console.error(`Error adding task: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error adding task',
      error: error.message,
    });
  }
};

/**
 * DELETE /tasks/:id
 * Delete a task by ID from database
 * 
 * @param {Object} req - Express request object with task ID in params
 * @param {Object} res - Express response object
 */
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      });
    }

    // Find task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(id);

    // Check if task exists
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // Send success response
    console.log(`✅ Task deleted: ${id}`);
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask,
    });
  } catch (error) {
    // Handle errors
    console.error(`Error deleting task: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message,
    });
  }
};

/**
 * PUT /update/:id
 * Update task text and optional completed status
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      });
    }

    if (text !== undefined && text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Task text cannot be empty',
      });
    }

    const updateData = {};

    if (text !== undefined) {
      updateData.text = text.trim();
    }

    if (completed !== undefined) {
      updateData.completed = completed;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields provided to update',
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    console.log(`✅ Task updated: ${id}`);
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    console.error(`Error updating task: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message,
    });
  }
};
