// Task Input Component
// Handles task input and submission

import React, { useState } from 'react';
import axios from 'axios';

/**
 * TaskInput Component
 * Input field for creating new tasks
 * Validates input before submission
 * Shows loading spinner and toast notification
 * 
 * @param {function} onTaskAdded - Callback function when task is successfully added
 * @returns {JSX.Element} - Task input JSX element
 */
const TaskInput = ({ onTaskAdded }) => {
  // State for input field value
  const [input, setInput] = useState('');

  // State for loading status
  const [loading, setLoading] = useState(false);

  // State for toast notification
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  /**
   * Handle input change event
   * Updates the input state as user types
   * 
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  /**
   * Show toast notification
   * Displays message for 3 seconds then hides
   * 
   * @param {string} message - Message to display
   * @param {string} type - Toast type: 'success' or 'error'
   */
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  /**
   * Handle form submission
   * Validates input, sends API request, updates UI
   * Uses async-await for clean error handling
   * 
   * @param {Event} e - Form submission event
   */
  const handleAddTask = async (e) => {
    e.preventDefault();

    // Trim input and validate
    const taskText = input.trim();
    if (!taskText) {
      showToast('Please enter a task', 'error');
      return;
    }

    try {
      setLoading(true);

      // Send POST request to backend
      const response = await axios.post('/api/add', { text: taskText });

      if (response.data.success) {
        // Clear input field on successful submission
        setInput('');

        // Show success toast
        showToast('✅ Task added successfully!', 'success');

        // Trigger parent component callback
        if (onTaskAdded) {
          onTaskAdded(response.data.data);
        }
      }
    } catch (error) {
      // Handle error response
      console.error('Error adding task:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add task';
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="task-input-section">
      <div className="task-input-container">
        {/* Task input form */}
        <form onSubmit={handleAddTask} className="task-form">
          <div className="input-wrapper">
            {/* Text input field */}
            <input
              type="text"
              placeholder="Enter your task..."
              value={input}
              onChange={handleInputChange}
              disabled={loading}
              className="task-input"
            />

            {/* Add Task button with loading spinner */}
            <button
              type="submit"
              disabled={loading}
              className="add-task-btn"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Adding...
                </>
              ) : (
                '➕ Add Task'
              )}
            </button>
          </div>
        </form>

        {/* Toast Notification */}
        {toast.show && (
          <div className={`toast toast-${toast.type}`}>
            {toast.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default TaskInput;
