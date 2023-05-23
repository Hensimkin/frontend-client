/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div className="main">
      <nav className="item">
        <ul className="ul">
          <li className="logo-container">
            <Link to="/" className="logo-link">
              <img src="https://i.ibb.co/JBSRQjR/output-onlinepngtools.png" alt="Logo" className="logo-image" />
            </Link>
          </li>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/SignIn">Sign In</Link>
          </li>
          <li>
            <Link to="/Signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
