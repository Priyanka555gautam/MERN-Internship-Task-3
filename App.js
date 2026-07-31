// Main App Component
// Orchestrates the entire application
// Manages state, fetches tasks, and renders components

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TaskInput from './components/TaskInput';
import TaskCard from './components/TaskCard';
import Footer from './components/Footer';

/**
 * App Component
 * Main component that manages application state and logic
 * Handles fetching tasks on mount and updating tasks dynamically
 */
function App() {
  // State for storing all tasks
  const [tasks, setTasks] = useState([]);

  // State for loading indicator
  const [loading, setLoading] = useState(true);

  // State for error handling
  const [error, setError] = useState(null);

  /**
   * Fetch all tasks from backend
   * Runs on component mount
   * Called when tasks are added or deleted to refresh list
   */
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make GET request to backend
      const response = await axios.get('/api/tasks');

      if (response.data.success) {
        // Update tasks state with fetched data
        setTasks(response.data.data);
      }
    } catch (err) {
      // Handle error and log to console
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * useEffect Hook
   * Runs once when component mounts
   * Fetches all tasks from backend
   */
  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Handle task added event
   * Refreshes task list when new task is added
   * Adds new task to top of list for immediate feedback
   * 
   * @param {Object} newTask - The newly created task object
   */
  const handleTaskAdded = (newTask) => {
    // Add new task to beginning of array (newest first)
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  /**
   * Handle task updated event
   * Replaces the updated task in local state immediately
   * 
   * @param {Object} updatedTask - The task object returned from backend
   */
  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  /**
   * Handle task deleted event
   * Removes deleted task from UI immediately
   * 
   * @param {string} taskId - ID of deleted task
   */
  const handleTaskDeleted = (taskId) => {
    // Filter out the deleted task
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  return (
    <div className="app">
      {/* Navigation bar */}
      <Navbar />

      {/* Hero section */}
      <Hero />

      {/* Task input section */}
      <TaskInput onTaskAdded={handleTaskAdded} />

      {/* Tasks display section */}
      <section className="tasks-section">
        <div className="tasks-container">
          {/* Loading indicator */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading your tasks...</p>
            </div>
          ) : error ? (
            // Error message
            <div className="error-container">
              <p className="error-message">⚠️ {error}</p>
              <button onClick={fetchTasks} className="retry-btn">
                🔄 Retry
              </button>
            </div>
          ) : tasks.length > 0 ? (
            // Tasks list
            <div className="tasks-grid">
              {/* Map through tasks and render TaskCard for each */}
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onTaskDeleted={handleTaskDeleted}
                  onTaskUpdated={handleTaskUpdated}
                />
              ))}
            </div>
          ) : (
            // Empty state message
            <div className="empty-state">
              <p className="empty-message">📋 No tasks yet!</p>
              <p className="empty-subtext">
                Create your first task to get started.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
