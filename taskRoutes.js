// Task Routes
// Defines all API endpoints for task operations
// Routes are mapped to controller functions

const express = require('express');
const router = express.Router();
const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} = require('../controllers/taskController');

/**
 * GET /tasks
 * Retrieve all tasks from database
 * Sorted by newest first
 */
router.get('/tasks', getTasks);

/**
 * POST /add
 * Create and save a new task
 * Expects: { text: "task description" }
 */
router.post('/add', addTask);

/**
 * PUT /update/:id
 * Update task text or completed status
 */
router.put('/update/:id', updateTask);

/**
 * DELETE /delete/:id
 * Delete a task by its ID
 */
router.delete('/delete/:id', deleteTask);

/**
 * Existing DELETE route preserved for backward compatibility
 */
router.delete('/tasks/:id', deleteTask);

module.exports = router;
