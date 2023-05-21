import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserNavbar.css';

function UserNavbar() {
  const [searchType, setSearchType] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSwitchSearchType = () => {
    setSearchType(searchType === 'products' ? 'users' : 'products');
  };

  const handleLogout = () => {
    // Perform logout logic here
    console.log('User logged out');
  };

  const handleSearchEnter = (event) => {
    if (event.key === 'Enter') {
      // Perform search logic here
      console.log('Search term:', searchTerm);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="main">
      <nav className="item">
        <ul className="ul">
          <li>
            <Link to="/HomePage">Home</Link>
          </li>
          <li>
            <Link to="/PersonalArea">Profile</Link>
          </li>
          <li className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleSearchEnter}
            />
            <button className="switch-button" onClick={handleSwitchSearchType}>
              {searchType === 'products' ? 'Switch to User Search' : 'Switch to Product Search'}
            </button>
            <button className="search-button" onClick={handleSearchEnter}>
              Enter
            </button>
          </li>
          <li>
            <Link to="/LikedProducts">Liked</Link>
          </li>
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default UserNavbar;
