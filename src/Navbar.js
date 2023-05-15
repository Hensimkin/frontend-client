import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="main">
      <nav className="item">
        <ul className="ul">
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/HomePage">Home</Link>
          </li>
          <li>
            <Link to="/SignIn">SignIn</Link>
          </li>
          <li>
            <Link to="/Signup">Signup</Link>
          </li>
          <li>
            <Link to="/PersonalArea">Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
