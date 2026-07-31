// Footer Component
// Displays application footer with credits

import React from 'react';

/**
 * Footer Component
 * Simple footer with technology credits
 * 
 * @returns {JSX.Element} - Footer JSX element
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          Made with ❤️ using React • Express • MongoDB
        </p>
        <p className="footer-subtext">
          © 2024 TaskFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
