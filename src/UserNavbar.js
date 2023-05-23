import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserNavbar.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark, faHome, faUser, faSignOutAlt, faSearch,
} from '@fortawesome/free-solid-svg-icons';

function UserNavbar() {
  const [searchType, setSearchType] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSwitchSearchType = () => {
    setSearchType(searchType === 'products' ? 'users' : 'products');
  };

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/signOut');
  };

  const handleSearchEnter = (event) => {
    if (event.key === 'Enter') {
      axios.post('http://localhost:5000/post_signOut');
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
                  <li className="logo-container">
                      <Link to="/HomePage" className="logo-link">
                          <img
                            src="https://i.ibb.co/JBSRQjR/output-onlinepngtools.png"
                            alt="Logo"
                            className="logo-image"
                          />
                      </Link>
                  </li>
                  <li className="search-bar">
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyPress={handleSearchEnter}
                      />
                      {/* eslint-disable-next-line react/button-has-type */}
                      <button className="switch-button" onClick={handleSwitchSearchType}>
                          {/* eslint-disable-next-line max-len */}
                          {searchType === 'products' ? 'Switch to User Search' : 'Switch to Product Search'}
                      </button>
                      {/* eslint-disable-next-line react/button-has-type */}
                      <button className="search-button" onClick={handleSearchEnter}>
                          <FontAwesomeIcon icon={faSearch} />
                      </button>
                  </li>
                  <li>
                      <Link to="/LikedProducts">
                          <FontAwesomeIcon icon={faBookmark} />
                      </Link>
                  </li>
                  <li>
                      <Link to="/HomePage">
                          <FontAwesomeIcon icon={faHome} />
                      </Link>
                  </li>
                  <li>
                      <Link to="/PersonalArea">
                          <FontAwesomeIcon icon={faUser} />
                      </Link>
                  </li>
                  <li>
                      <Link to="/Signin" onClick={handleLogout}>
                          <FontAwesomeIcon icon={faSignOutAlt} />
                      </Link>
                  </li>
              </ul>
          </nav>
      </div>
  );
}

export default UserNavbar;
