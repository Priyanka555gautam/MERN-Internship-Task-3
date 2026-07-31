# TaskFlow - MERN Stack To-Do List Application

A modern, production-quality To-Do List application built with the MERN Stack (MongoDB, Express, React, Node.js). Features a beautiful dark theme with glassmorphism design, smooth animations, and full CRUD functionality.

## 🎯 Project Overview

TaskFlow is a complete MERN stack application designed to help users organize and manage their daily tasks efficiently. It follows best practices including MVC architecture, clean code principles, reusable components, and proper error handling.

### ✨ Key Features

- ✅ **Create Tasks** - Add new tasks with beautiful animations
- 📋 **View All Tasks** - Display all tasks sorted by newest first
- 🗑️ **Delete Tasks** - Remove completed or unwanted tasks
- 🎨 **Modern UI** - Dark theme with purple-blue gradient and glassmorphism
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🚀 **Loading States** - Beautiful loading spinner while fetching data
- 🔔 **Toast Notifications** - Feedback messages for user actions
- ⚡ **Smooth Animations** - Hover effects and transitions throughout
- 💾 **Persistent Storage** - All tasks saved in MongoDB Atlas
- 🛡️ **Error Handling** - Proper error messages and retry functionality

## 📋 Project Structure

```
MERN-Task-2/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   └── taskController.js     # Business logic for task operations
│   ├── models/
│   │   └── Task.js               # MongoDB schema definition
│   ├── routes/
│   │   └── taskRoutes.js         # API endpoints
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server setup
│   └── package.json              # Backend dependencies
│
└── frontend/
    ├── public/
    │   └── index.html            # HTML entry point
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation header
    │   │   ├── Hero.jsx          # Landing section
    │   │   ├── TaskInput.jsx     # Task input form
    │   │   ├── TaskCard.jsx      # Individual task display
    │   │   └── Footer.jsx        # Footer section
    │   ├── App.js                # Main app component
    │   ├── App.css               # Complete styling
    │   ├── index.js              # React entry point
    │   └── package.json          # Frontend dependencies
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React.js** - UI library
- **Axios** - HTTP client
- **React Hooks** - State management (useState, useEffect)
- **CSS3** - Styling with animations and gradients

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) - Comes with Node.js
- **MongoDB Atlas Account** - [Create Free Account](https://www.mongodb.com/cloud/atlas)
- **Git** (optional) - [Download](https://git-scm.com/)

### Verify Installation
```bash
node --version
npm --version
```

## 🚀 Getting Started

### Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. In **Database Access**, create a user with username and password
5. In **Network Access**, add your IP address (or use 0.0.0.0/0 for development)
6. Click **Connect** and copy the connection string
7. Replace the credentials in the connection string with your username and password

### Step 2: Clone/Download the Project

```bash
# Navigate to your desired directory
cd path/to/projects

# Clone the repository (if using git)
git clone <repository-url>
cd MERN-Task-2
```

### Step 3: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with your MongoDB URI
# Edit .env file and add your MongoDB connection string
```

**Backend .env Configuration:**
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/todo-app?retryWrites=true&w=majority
NODE_ENV=development
```

### Step 4: Setup Frontend

```bash
# Open a new terminal/command prompt
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### Step 5: Run the Application

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

Expected output:
```
🚀 Server running on http://localhost:5000
📝 Environment: development
✅ MongoDB Connected: cluster0.mongodb.net
```

**Terminal 2 - Start Frontend Application:**
```bash
cd frontend
npm start
# or
npm run dev
```

The application will open automatically at `http://localhost:3000`

## 📚 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Tasks
```
GET /tasks
Response: { success: true, data: [...] }
```

#### 2. Add New Task
```
POST /add
Request Body: { text: "Your task here" }
Response: { success: true, data: { _id, text, createdAt, updatedAt } }
```

#### 3. Delete Task
```
DELETE /tasks/:id
Response: { success: true, data: { _id, text, ... } }
```

#### 4. Health Check
```
GET /health
Response: { success: true, message: "Server is running" }
```

## 💡 Usage Guide

### Adding a Task
1. Type your task in the input field with placeholder "Enter your task..."
2. Click the "➕ Add Task" button
3. See the toast notification confirming the task was added
4. Task appears at the top of the list

### Viewing Tasks
- All tasks are fetched automatically when the page loads
- Tasks are displayed in beautiful glassmorphic cards
- Newest tasks appear first
- Each card shows the task text and creation date

### Deleting a Task
1. Hover over any task card
2. Click the trash icon (🗑️) in the bottom right
3. Confirm the deletion in the popup
4. Task is removed from the list immediately

## 🎨 Design Features

### Color Scheme
- **Primary Gradient**: Purple (#9d4edd) → Blue (#3a0ca3)
- **Background**: Dark (#0f0f1e to #1a1a3e)
- **Text**: Light (#e0e0e0)
- **Accent**: Cyan/Purple (#a0a0ff)

### UI Components
- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Gradient Borders**: Animated gradient on task cards
- **Smooth Transitions**: 0.3s ease on all interactive elements
- **Hover Animations**: Cards lift up on hover
- **Loading Spinner**: Rotating animation during data fetch
- **Toast Notifications**: Slide in/out animations

### Responsive Breakpoints
- **Desktop**: Full grid layout (3 columns)
- **Tablet (≤768px)**: 2 columns, adjusted spacing
- **Mobile (≤480px)**: Single column, optimized touch targets
- **Small Mobile (≤360px)**: Reduced font sizes for tiny screens

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
- ✅ Check MongoDB Atlas connection string in .env
- ✅ Verify database username and password
- ✅ Add your IP address in MongoDB Atlas Network Access
- ✅ Ensure internet connection is stable

### "Port 5000 already in use"
```bash
# Change PORT in backend/.env to a different number (e.g., 5001)
# Then restart the server
```

### "Cannot GET /api/tasks"
- ✅ Ensure backend server is running on port 5000
- ✅ Check that Node.js and npm are installed
- ✅ Verify all dependencies are installed: `npm install`

### "CORS error in frontend"
- ✅ Backend server must be running
- ✅ Check proxy setting in frontend/package.json: `"proxy": "http://localhost:5000"`

### Tasks not saving to database
- ✅ Verify MongoDB URI is correct
- ✅ Check MongoDB Atlas database allows connection from your IP
- ✅ Ensure database user has write permissions
- ✅ Check browser console for error messages

### Styling not loading
- ✅ Ensure App.css is in frontend/src/
- ✅ Restart frontend development server
- ✅ Clear browser cache (Ctrl+Shift+Delete)

## 📖 Code Quality Features

- ✅ **Clean Architecture**: MVC pattern for backend
- ✅ **Reusable Components**: Modular React components
- ✅ **Comprehensive Comments**: Beginner-friendly documentation
- ✅ **Error Handling**: Try-catch blocks and validation
- ✅ **Async-Await**: Modern JavaScript promises
- ✅ **React Hooks**: useState and useEffect for state management
- ✅ **Separation of Concerns**: CSS files separate from components
- ✅ **Professional Formatting**: Proper indentation and naming conventions

## 🚀 Deployment

### Deploy Backend (Heroku/Railway)
1. Create account on Heroku or Railway
2. Connect your Git repository
3. Set environment variables in dashboard
4. Deploy with one click

### Deploy Frontend (Vercel/Netlify)
1. Run `npm run build` in frontend directory
2. Connect your Git repository to Vercel/Netlify
3. Build settings: `npm install && npm run build`
4. Publish directory: `build`

## 📝 MongoDB Schema

```javascript
Task Schema:
{
  text: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true
  },
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🎓 Learning Resources

### MERN Stack Tutorials
- [MongoDB Tutorial](https://docs.mongodb.com/)
- [Express Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Guide](https://nodejs.org/docs/)

### Recommended Courses
- freeCodeCamp MERN Stack Course
- Udemy MERN Full Stack Development
- YouTube MERN Playlist Tutorials

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest improvements
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a comprehensive MERN Stack internship project following industry best practices.

## ⭐ Show Your Support

If you find this project helpful, please:
- ⭐ Star the repository
- 📌 Share with others
- 💬 Provide feedback
- 🐛 Report any issues

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the code comments for explanations
3. Check browser console for error messages
4. Verify environment variables are set correctly

## 🎉 Features Included

### ✅ Core Features
- [x] Full CRUD operations
- [x] MongoDB integration
- [x] RESTful API
- [x] React components
- [x] Responsive design

### ✅ Advanced Features
- [x] Loading states
- [x] Toast notifications
- [x] Error handling
- [x] Input validation
- [x] Smooth animations
- [x] Glassmorphism design
- [x] Dark theme
- [x] Mobile optimization

## 🚀 Future Enhancements

Possible additions:
- User authentication/login
- Task categories and tags
- Due dates and reminders
- Priority levels
- Search functionality
- Task editing
- Dark/Light theme toggle
- Export to CSV/PDF
- Task statistics dashboard

---

**Happy Task Management! 🎯✨**

Make your productivity journey smooth and enjoyable with TaskFlow!
