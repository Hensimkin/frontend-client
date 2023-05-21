import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [searchType, setSearchType] = useState('products');

  const handleSwitchSearchType = () => {
    setSearchType(searchType === 'products' ? 'users' : 'products');
  };

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
          <li className="search-bar">
            <input type="text" placeholder="Search" />
            <button className="switch-button" onClick={handleSwitchSearchType}>
              {searchType === 'products' ? 'Switch to User Search' : 'Switch to Product Search'}
            </button>
          </li>
          <li>
            <Link to="/LikedProducts">Liked</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
