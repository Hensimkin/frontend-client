/* eslint-disable */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserNavbar(props) {
  const { handleSearchChange, fetchUserListings } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    console.log('User logged out');
  };

  const handleSearchEnter = async (event) => {
    if (event.key === 'Enter') {
      if (window.location.pathname !== '/HomePage') {
        navigate('/HomePage');
      }
      await fetchUserListings(); // Call the fetchUserListings function from props
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearchChange(event); // Call the handleSearchChange function from props
  };

  return (
    <div className="main">
      <nav className="item">
        <ul className="ul">
          <li className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleChange}
              onKeyPress={handleSearchEnter}
              onClick={() => {
                if (window.location.pathname !== '/HomePage') {
                  navigate('/HomePage');
                }
              }}
            />
          </li>
          <li>
            <Link to="/LikedProducts">Saved</Link>
          </li>
          <li>
            <Link to="/HomePage">Home</Link>
          </li>
          <li>
            <Link to="/PersonalArea">Profile</Link>
          </li>
          <li>
            <Link to="/Signin" onClick={handleLogout}>Sign-out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default UserNavbar;
