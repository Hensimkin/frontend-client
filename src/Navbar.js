import React from 'react';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function Navbar() {
  return (
      <div className="main">
          <nav className="item">

              <ul className="ul">
                  <li>
                      <Link to="/">Home</Link>
                  </li>

                  <li>
                      <Link to="/About">About</Link>
                  </li>

                  <li>
                      <Link to="/Signup">Signup</Link>
                  </li>
                  {/* <li><a href="/About">About</a></li> */}
                  {/* <li><a href="#">Signup</a></li> */}
                  <li>
                      <Link to="/SignIn">SignIn</Link>
                  </li>
              </ul>
          </nav>

      </div>

  );
}

export default Navbar;
