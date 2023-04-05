import React from 'react';
import './About.css';
// eslint-disable-next-line import/extensions
import Navbar from './Navbar.js';

function About() {
  return (
      <div>

          <header className="header">
              <Navbar />
          </header>

          <main>
              <h1 className="title" style={{ color: 'white' }}>About</h1>
              <p style={{ color: 'white' }}>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  NetConnect is the ultimate social media platform for today's connected world.
                  Connect with friends, family, and like-minded individuals from around the globe.
                  Share your thoughts, ideas, and experiences in real-time, and stay up-to-date with
                  the latest trends and happenings in your social circle.
              </p>
          </main>

      </div>
  );
}

export default About;
