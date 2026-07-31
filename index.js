// Entry point for React application
// Renders the App component into the root DOM element

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Create root and render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
