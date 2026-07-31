// Task Card Component
// Displays individual task in a beautiful card format

import React, { useState } from 'react';
import axios from 'axios';

/**
 * TaskCard Component
 * Renders a single task with edit, delete, and completed functionality
 * Features glassmorphism design and hover animations
 * 
 * @param {Object} task - Task object containing _id, text, completed, and createdAt
 * @param {function} onTaskDeleted - Callback function when task is deleted
 * @param {function} onTaskUpdated - Callback function when task is updated
 * @returns {JSX.Element} - Task card JSX element
 */
const TaskCard = ({ task, onTaskDeleted, onTaskUpdated }) => {
  // State for delete button loading
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(Boolean(task.completed));

  /**
   * Format date to readable format
   * Converts ISO date to "Month Day, Year" format
   * 
   * @param {string} dateString - ISO date string
   * @returns {string} - Formatted date string
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleEditClick = () => {
    setEditText(task.text);
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setEditing(false);
  };

  const handleTextChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSaveEdit = async () => {
    const trimmedText = editText.trim();
    if (!trimmedText) {
      alert('Task text cannot be empty.');
      return;
    }

    try {
      setSaving(true);
      const response = await axios.put(`/api/update/${task._id}`, {
        text: trimmedText,
        completed,
      });

      if (response.data.success) {
        if (onTaskUpdated) {
          onTaskUpdated(response.data.data);
        }
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert(error.response?.data?.message || 'Failed to update task.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setDeleting(true);

      // Send DELETE request to backend
      const response = await axios.delete(`/api/delete/${task._id}`);

      if (response.data.success) {
        // Trigger parent component callback
        if (onTaskDeleted) {
          onTaskDeleted(task._id);
        }
      }
    } catch (error) {
      // Handle error
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const handleToggleCompleted = async () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);

    try {
      const response = await axios.put(`/api/update/${task._id}`, {
        completed: newCompleted,
      });

      if (response.data.success && onTaskUpdated) {
        onTaskUpdated(response.data.data);
      }
    } catch (error) {
      console.error('Error toggling completed:', error);
      setCompleted(!newCompleted);
      alert('Failed to update task status. Please try again.');
    }
  };

  return (
    <div className="task-card">
      {/* Gradient left border */}
      <div className="card-border"></div>

      {/* Card content */}
      <div className="card-content">
        <div className="card-top-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={completed}
              onChange={handleToggleCompleted}
              className="task-checkbox"
            />
            <span className="checkbox-custom"></span>
          </label>

          <div className="task-actions">
            {!editing ? (
              <button
                onClick={handleEditClick}
                className="icon-btn edit-btn"
                title="Edit task"
              >
                ✏️
              </button>
            ) : null}
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="icon-btn delete-btn"
              title="Delete task"
            >
              {deleting ? '⏳' : '🗑️'}
            </button>
          </div>
        </div>

        {editing ? (
          <div className="edit-row">
            <input
              type="text"
              value={editText}
              onChange={handleTextChange}
              className="edit-input"
              disabled={saving}
            />
            <div className="edit-controls">
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="save-btn"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={saving}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className={`card-text ${completed ? 'completed-task' : ''}`}>
            {task.text}
          </p>
        )}

        {/* Task metadata and actions */}
        <div className="card-footer">
          {/* Task creation date */}
          <span className="card-date">📅 {formatDate(task.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
