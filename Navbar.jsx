// Navbar Component
// Displays the application header with branding

import React from 'react';

/**
 * Navbar Component
 * Fixed header with TaskFlow branding
 * Displays at the top of the page
 * 
 * @returns {JSX.Element} - Navbar JSX element
 */
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and branding */}
        <h1 className="navbar-title">
          ✨ TaskFlow
        </h1>
        <p className="navbar-subtitle">Stay Productive</p>
      </div>
    </nav>
  );
};

export default Navbar;
