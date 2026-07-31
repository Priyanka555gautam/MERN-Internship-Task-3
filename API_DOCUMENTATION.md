# 📚 TaskFlow API Documentation

## Overview

The TaskFlow API is a RESTful backend service built with Express.js and MongoDB. It provides endpoints for managing to-do tasks with full CRUD (Create, Read, Update, Delete) operations.

**Base URL**: `http://localhost:5000/api`

**Environment**: Development (`http://localhost:5000`), Production (deployment URL)

---

## 🔐 Authentication

Currently, the API does not require authentication. All endpoints are public.

**Future Enhancement**: Add JWT-based authentication for user-specific tasks.

---

## 📋 API Endpoints

### 1. Health Check

**Endpoint**: `GET /health`

**Description**: Verify server is running and operational.

**Request**:
```http
GET /api/health HTTP/1.1
Host: localhost:5000
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Server is running"
}
```

**Use Case**: Server health monitoring, readiness checks

---

### 2. Get All Tasks

**Endpoint**: `GET /tasks`

**Description**: Retrieve all tasks from database, sorted by newest first.

**Request**:
```http
GET /api/tasks HTTP/1.1
Host: localhost:5000
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Tasks fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "text": "Complete project documentation",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "__v": 0
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "text": "Review pull requests",
      "createdAt": "2024-01-15T09:15:00.000Z",
      "updatedAt": "2024-01-15T09:15:00.000Z",
      "__v": 0
    }
  ]
}
```

**Error Response** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "Error fetching tasks",
  "error": "Database connection failed"
}
```

**Query Parameters**: None

**Sorting**: By `createdAt` descending (newest first)

**Use Cases**: 
- Page load
- Refresh task list
- Display all user tasks

---

### 3. Add New Task

**Endpoint**: `POST /add`

**Description**: Create and save a new task to the database.

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "text": "Learn MongoDB aggregation"
}
```

**Request Example**:
```bash
curl -X POST http://localhost:5000/api/add \
  -H "Content-Type: application/json" \
  -d '{"text": "Learn MongoDB aggregation"}'
```

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "Task added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "text": "Learn MongoDB aggregation",
    "createdAt": "2024-01-15T11:45:30.123Z",
    "updatedAt": "2024-01-15T11:45:30.123Z",
    "__v": 0
  }
}
```

**Validation Error** (400 Bad Request):
```json
{
  "success": false,
  "message": "Please provide task text"
}
```

**Server Error** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "Error adding task",
  "error": "Internal server error details"
}
```

**Request Body Parameters**:
- `text` (string, required)
  - Description: Task description
  - Min length: 1 character (after trim)
  - Max length: 500 characters
  - Required: Yes

**Validation Rules**:
- Text cannot be empty or only whitespace
- Text is trimmed of leading/trailing spaces
- Text must be a string
- Text cannot exceed 500 characters

**Response Fields**:
- `_id`: MongoDB object ID (unique identifier)
- `text`: Task text as provided
- `createdAt`: ISO 8601 timestamp when created
- `updatedAt`: ISO 8601 timestamp when last updated
- `__v`: MongoDB version field

**Use Cases**:
- Add new task from input form
- Create task from UI interaction

**Code Example** (Axios):
```javascript
const addTask = async (taskText) => {
  try {
    const response = await axios.post('/api/add', { text: taskText });
    console.log('Task created:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error:', error.response.data.message);
  }
};

// Usage
addTask('Learn React Hooks');
```

---

### 4. Delete Task

**Endpoint**: `DELETE /tasks/:id`

**Description**: Delete a specific task by its ID.

**Request**:
```http
DELETE /api/tasks/507f1f77bcf86cd799439011 HTTP/1.1
Host: localhost:5000
```

**Request Example**:
```bash
curl -X DELETE http://localhost:5000/api/tasks/507f1f77bcf86cd799439011
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "text": "Complete project documentation",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "__v": 0
  }
}
```

**Not Found Error** (404 Not Found):
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Server Error** (500 Internal Server Error):
```json
{
  "success": false,
  "message": "Error deleting task",
  "error": "Internal server error details"
}
```

**URL Parameters**:
- `id` (string, required)
  - Description: MongoDB object ID of task to delete
  - Format: Valid MongoDB ObjectId (24 hex characters)

**Response**: Returns deleted task object (for confirmation)

**Use Cases**:
- Delete task from UI
- Confirm deletion by showing what was deleted

**Code Example** (Axios):
```javascript
const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`/api/tasks/${taskId}`);
    console.log('Task deleted:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error:', error.response.data.message);
  }
};

// Usage
deleteTask('507f1f77bcf86cd799439011');
```

---

## 🔄 Request/Response Format

### Request Format
All requests should use:
- **Method**: HTTP method (GET, POST, DELETE, etc.)
- **URL**: Complete endpoint URL
- **Headers**: 
  - For POST: `Content-Type: application/json`
- **Body** (for POST): JSON object

### Response Format
All responses follow the same structure:
```json
{
  "success": true|false,
  "message": "Descriptive message",
  "data": {} | null,
  "error": "Error details (only on error)"
}
```

---

## 🚨 Error Handling

### Error Codes

| Status | Code | Meaning | Example |
|--------|------|---------|---------|
| 200 | OK | Request successful | Task fetched |
| 201 | CREATED | Resource created | Task added |
| 400 | BAD_REQUEST | Invalid input | Empty task text |
| 404 | NOT_FOUND | Resource not found | Task ID doesn't exist |
| 500 | SERVER_ERROR | Internal server error | Database connection error |

### Common Errors

**1. Empty Task Text**
```json
{
  "success": false,
  "message": "Please provide task text"
}
```
**Fix**: Provide non-empty text in request body

**2. Invalid Task ID**
```json
{
  "success": false,
  "message": "Task not found"
}
```
**Fix**: Use valid MongoDB ObjectId, ensure task exists

**3. Server Connection Error**
```json
{
  "success": false,
  "message": "Error fetching tasks",
  "error": "MongoDB connection error"
}
```
**Fix**: Check MongoDB connection string, verify server running

---

## 📊 Data Schema

### Task Object
```javascript
{
  _id: ObjectId,           // Unique identifier
  text: String,            // Task description (1-500 chars)
  createdAt: Date,         // Timestamp when created
  updatedAt: Date,         // Timestamp when updated
  __v: Number             // MongoDB version field
}
```

### Example Task
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "text": "Complete MERN project",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "__v": 0
}
```

---

## 🔗 API Usage Examples

### Using Axios (Frontend)
```javascript
import axios from 'axios';

// Get all tasks
const fetchTasks = async () => {
  const response = await axios.get('/api/tasks');
  return response.data.data;
};

// Add new task
const addTask = async (text) => {
  const response = await axios.post('/api/add', { text });
  return response.data.data;
};

// Delete task
const deleteTask = async (id) => {
  const response = await axios.delete(`/api/tasks/${id}`);
  return response.data.data;
};
```

### Using Fetch API
```javascript
// Get all tasks
fetch('http://localhost:5000/api/tasks')
  .then(res => res.json())
  .then(data => console.log(data.data));

// Add task
fetch('http://localhost:5000/api/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'New task' })
})
  .then(res => res.json())
  .then(data => console.log(data.data));

// Delete task
fetch('http://localhost:5000/api/tasks/507f1f77bcf86cd799439011', {
  method: 'DELETE'
})
  .then(res => res.json())
  .then(data => console.log(data.data));
```

### Using cURL (Command Line)
```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Add task
curl -X POST http://localhost:5000/api/add \
  -H "Content-Type: application/json" \
  -d '{"text":"New task"}'

# Delete task
curl -X DELETE http://localhost:5000/api/tasks/507f1f77bcf86cd799439011
```

### Using Postman
1. Create new requests in Postman
2. For GET: Select GET, enter `http://localhost:5000/api/tasks`
3. For POST: Select POST, enter `http://localhost:5000/api/add`
   - Go to Body → raw → JSON
   - Enter: `{"text":"Your task"}`
4. For DELETE: Select DELETE, enter `http://localhost:5000/api/tasks/{id}`
5. Send and view responses

---

## 🔧 Environment Setup

### Backend Environment Variables
```
PORT=5000                                    # Server port
MONGO_URI=mongodb+srv://user:pass@...       # MongoDB connection
NODE_ENV=development                        # Environment
```

### Frontend Environment
```
REACT_APP_API_URL=http://localhost:5000    # Backend URL
```

---

## 📈 API Performance

### Expected Response Times
- GET /tasks: 100-300ms (depends on task count)
- POST /add: 150-400ms
- DELETE /tasks/:id: 100-300ms

### Optimization Tips
- Database has index on createdAt for sorting
- Connection pooling enabled
- API responses are lean (only needed data)

---

## 🔮 Future Enhancements

### Planned API Endpoints
- `PUT /tasks/:id` - Update existing task
- `PATCH /tasks/:id/toggle` - Toggle task completion
- `GET /tasks/search?q=text` - Search tasks
- `GET /tasks/category/:cat` - Filter by category
- `POST /auth/login` - User authentication
- `GET /tasks/stats` - Task statistics

---

## 🧪 Testing the API

### Automated Testing
```bash
# Run with Jest
npm test

# Run with Postman
Import POSTMAN_COLLECTION.json
```

### Manual Testing Steps
1. Start backend server: `npm start`
2. Test Health Check: `GET /api/health`
3. Get Tasks: `GET /api/tasks` (should be empty)
4. Add Task: `POST /api/add` with `{"text": "Test"}`
5. Get Tasks: `GET /api/tasks` (should show new task)
6. Delete Task: `DELETE /api/tasks/{id}` with task ID
7. Get Tasks: `GET /api/tasks` (should be empty again)

---

## 📞 Support

### API Issues?
1. Check server is running on port 5000
2. Check MongoDB connection string
3. Review error messages in server console
4. Check request format matches documentation
5. Verify Content-Type header for POST requests

### More Help?
- See README.md for setup
- Check SETUP_INSTRUCTIONS.md for troubleshooting
- Review code comments in backend files
- Check browser console for frontend errors

---

**Last Updated**: 2024-01-15
**API Version**: v1.0.0
**Status**: ✅ Production Ready
