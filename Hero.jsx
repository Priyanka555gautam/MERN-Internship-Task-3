// Hero Section Component
// Displays welcome message and introduction

import React from 'react';

/**
 * Hero Component
 * Landing section with headline and subheading
 * Sets the tone for the application
 * 
 * @returns {JSX.Element} - Hero section JSX element
 */
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        {/* Main heading */}
        <h2 className="hero-heading">Organize Your Daily Tasks</h2>

        {/* Subheading */}
        <p className="hero-subheading">
          Stay productive by managing your daily work with a modern MERN 
          To-Do application. Create, track, and complete your tasks effortlessly.
        </p>
      </div>
    </section>
  );
};

export default Hero;
