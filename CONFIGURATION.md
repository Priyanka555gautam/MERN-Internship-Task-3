# ⚙️ Configuration & Environment Setup Guide

## Overview

This guide explains all configuration files and environment variables used in the TaskFlow MERN application.

---

## 🔐 Backend Environment Variables (.env)

### File Location
```
backend/.env
```

### Configuration Template

```bash
# Server Configuration
PORT=5000

# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/todo-app?retryWrites=true&w=majority

# Environment
NODE_ENV=development
```

### Detailed Explanation

#### 1. PORT
- **Purpose**: Port number where server runs
- **Type**: Number
- **Default**: 5000
- **Example**: `PORT=5000`
- **Change**: If 5000 is occupied, use `PORT=5001`

#### 2. MONGO_URI
- **Purpose**: MongoDB Atlas connection string
- **Type**: String
- **Format**: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
- **Example**: `MONGO_URI=mongodb+srv://taskflow_user:myPassword123@cluster0.mongodb.net/todo-app?retryWrites=true&w=majority`
- **Where to get**:
  1. Go to MongoDB Atlas
  2. Click "Connect" on your cluster
  3. Select "Drivers" (not Compass)
  4. Copy the connection string
  5. Replace `<username>` and `<password>`
  6. Replace `<DATABASE>` with `todo-app` (or any name)

#### 3. NODE_ENV
- **Purpose**: Environment mode
- **Type**: String
- **Values**: `development` | `production`
- **Default**: `development`
- **Example**: `NODE_ENV=development`
- **Impact**: 
  - `development`: Detailed error messages, no optimizations
  - `production`: Optimized, fewer logs

### How to Create .env File

**Option 1: Using Text Editor**
1. Open Notepad or VS Code
2. Type the configuration
3. Save as `backend/.env` (NOT .env.txt)
4. Restart server

**Option 2: Using Terminal**
```bash
# Windows (Command Prompt)
cd backend
echo PORT=5000 > .env
echo MONGO_URI=your_connection_string >> .env
echo NODE_ENV=development >> .env

# Mac/Linux
cd backend
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todo-app?retryWrites=true&w=majority
NODE_ENV=development
EOF
```

### Example .env Files

**Development Setup**
```bash
PORT=5000
MONGO_URI=mongodb+srv://taskflow_user:securePass123@cluster0.mongodb.net/todo-app?retryWrites=true&w=majority
NODE_ENV=development
```

**Production Setup**
```bash
PORT=5000
MONGO_URI=mongodb+srv://prod_user:prodPassword456@prod-cluster.mongodb.net/todo-app?retryWrites=true&w=majority
NODE_ENV=production
```

---

## 📦 Backend package.json

### File Location
```
backend/package.json
```

### Key Sections

#### Dependencies
```json
{
  "express": "^4.18.2",    // Web framework
  "mongoose": "^7.0.0",    // MongoDB ODM
  "cors": "^2.8.5",        // Cross-origin requests
  "dotenv": "^16.0.3"      // Environment variables
}
```

#### Scripts
```json
{
  "start": "node server.js",      // Production server
  "dev": "nodemon server.js"      // Development with auto-reload
}
```

#### How to Use
```bash
# Install all dependencies
npm install

# Run production server
npm start

# Run development server (auto-reload on file changes)
npm run dev
```

---

## 🎨 Frontend Configuration

### File Location
```
frontend/package.json
```

### Proxy Configuration

**What it does**: Routes API calls from frontend to backend

```json
{
  "proxy": "http://localhost:5000"
}
```

**How it works**:
- Frontend makes request to `/api/tasks`
- Proxy redirects to `http://localhost:5000/api/tasks`
- Response returned to frontend
- Solves CORS issues in development

**Important**: 
- Backend must be running on port 5000
- Change if using different backend port
- Not needed in production (use full URL)

### Scripts
```json
{
  "start": "react-scripts start",    // Start dev server
  "build": "react-scripts build",    // Create production build
  "test": "react-scripts test"       // Run tests
}
```

---

## 🗄️ MongoDB Atlas Setup

### Account Creation
1. Visit https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Create account with email
4. Verify email

### Cluster Creation
1. In Dashboard → "Create Project" (or use default)
2. Click "Create Deployment"
3. Choose Free Tier
4. Select Region closest to you
5. Click "Create Cluster"
6. Wait 3-5 minutes for cluster to be ready

### Database User Setup
1. Go to "Security" → "Database Access"
2. Click "Add New Database User"
3. **Username**: `taskflow_user` (or your choice)
4. **Password**: Create strong password (save this!)
5. Click "Add User"

### IP Whitelist Setup
1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Options:
   - "Add Current IP Address" (recommended for dev)
   - "Allow Access from Anywhere" (0.0.0.0/0) - easy but less secure
4. Click "Confirm"

### Get Connection String
1. Click "Databases" → "Connect" button
2. Select "Drivers" (NOT Compass)
3. Select language: Node.js
4. Copy the connection string
5. Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>`

### Use in .env
```bash
MONGO_URI=mongodb+srv://taskflow_user:myPassword@cluster0.mongodb.net/todo-app?retryWrites=true&w=majority
```

---

## 🔧 VS Code Configuration (Optional)

### Recommended Extensions
```json
{
  "extensions": [
    "esbenp.prettier-vscode",        // Code formatter
    "dbaeumer.vscode-eslint",        // Linting
    "MongoDB.MongoDB",               // MongoDB browser
    "Thunder Client",                // API testing
    "REST Client"                    // HTTP testing
  ]
}
```

### Settings.json (Optional)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.exclude": {
    "**/node_modules": true
  }
}
```

---

## 🌐 API Configuration (Frontend)

### Axios Setup
In `frontend/src/App.js` and components:

```javascript
import axios from 'axios';

// Using proxy (development)
// Request to /api/tasks → redirects to http://localhost:5000/api/tasks
axios.get('/api/tasks')

// Using full URL (production)
// axios.get('https://api.example.com/api/tasks')
```

### CORS Configuration (Backend)
In `backend/server.js`:

```javascript
const cors = require('cors');
app.use(cors());
```

**Current Setting**: Allows all origins
**Production Setting**: Restrict to specific domain
```javascript
app.use(cors({
  origin: 'https://yourdomain.com'
}));
```

---

## 🚀 Deployment Configuration

### Environment Variables for Production

**.env (Production)**
```bash
PORT=5000
MONGO_URI=mongodb+srv://prod_user:prod_password@prod-cluster.mongodb.net/todo-app
NODE_ENV=production
```

### Heroku Deployment
1. Create `Procfile` in backend:
```
web: node server.js
```

2. Set environment variables in Heroku:
```bash
heroku config:set PORT=5000
heroku config:set MONGO_URI=your_production_uri
heroku config:set NODE_ENV=production
```

### Vercel Frontend Deployment
1. Set environment variables in Vercel dashboard:
```
REACT_APP_API_URL=https://your-api.herokuapp.com
```

2. Update frontend API calls:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
axios.get(`${API_URL}/api/tasks`)
```

---

## 📝 Git Configuration

### .gitignore Files

**backend/.gitignore**
```
node_modules/
.env
.env.local
npm-debug.log*
.DS_Store
```

**frontend/.gitignore**
```
node_modules/
.env.local
npm-debug.log*
build/
.DS_Store
```

### GitHub Secrets (for CI/CD)
Set these in GitHub repository settings:
```
MONGO_URI=<your_connection_string>
PORT=5000
```

---

## 🧪 Configuration for Different Environments

### Development
```bash
# backend/.env
PORT=5000
MONGO_URI=mongodb+srv://dev_user:devpass@cluster0.mongodb.net/todo-app-dev
NODE_ENV=development
```

### Testing
```bash
# backend/.env
PORT=5001
MONGO_URI=mongodb+srv://test_user:testpass@cluster0.mongodb.net/todo-app-test
NODE_ENV=testing
```

### Production
```bash
# backend/.env
PORT=5000
MONGO_URI=mongodb+srv://prod_user:prodpass@prod-cluster.mongodb.net/todo-app
NODE_ENV=production
```

---

## ✅ Configuration Checklist

### Before Running Backend
- [ ] Node.js and npm installed
- [ ] backend/.env file created
- [ ] MongoDB URI in .env
- [ ] MongoDB user created
- [ ] IP address whitelisted
- [ ] Dependencies installed (`npm install`)
- [ ] PORT not in use

### Before Running Frontend
- [ ] React dependencies installed (`npm install`)
- [ ] proxy in package.json points to :5000
- [ ] Backend server running
- [ ] PORT 3000 not in use

### Before Deployment
- [ ] All configuration tested locally
- [ ] Production .env created
- [ ] MongoDB production user created
- [ ] Deployment platform configured
- [ ] Environment variables set
- [ ] Security settings reviewed

---

## 🔍 Troubleshooting Configuration

### Issue: "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### Issue: "MONGO_URI is undefined"
- Check .env file exists in backend folder
- Verify `require('dotenv').config()` is at top of server.js
- Check .env format (no quotes around values)

### Issue: "Port 5000 already in use"
Change in .env:
```bash
PORT=5001  # Use different port
```

### Issue: "CORS error"
- Ensure backend is running
- Check proxy in frontend/package.json
- Verify CORS middleware in server.js

### Issue: "MongoDB connection timeout"
- Check internet connection
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Test connection string in browser

---

## 📚 Configuration Files Summary

| File | Purpose | Location |
|------|---------|----------|
| `.env` | Environment variables | `backend/.env` |
| `package.json` | Dependencies & scripts | `backend/package.json`, `frontend/package.json` |
| `.gitignore` | Git ignore rules | `backend/.gitignore`, `frontend/.gitignore` |
| `server.js` | Backend configuration | `backend/server.js` |
| `.env` | CORS configuration | `backend/server.js` (inline) |
| `index.html` | HTML configuration | `frontend/public/index.html` |

---

## 🔑 Key Configuration Concepts

### Environment Variables
- Secure way to store sensitive data
- Different values per environment
- Not committed to Git
- Loaded at runtime

### Proxy
- Development convenience
- Routes requests to backend
- Solves CORS issues
- Not used in production

### CORS
- Cross-Origin Resource Sharing
- Allows frontend to access backend API
- Currently allows all origins
- Should be restricted in production

### Scripts
- npm commands defined in package.json
- `start`: Run application
- `dev`: Run with auto-reload
- `build`: Create production build

---

**Last Updated**: 2024-01-15  
**Configuration Version**: 1.0.0
