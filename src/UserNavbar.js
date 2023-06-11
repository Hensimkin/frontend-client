import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './cssFile.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark, faHome, faUser, faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

function UserNavbar() {
  const [searchTerm, setSearchTerm] = useState('');
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
                            src="http://i.ibb.co/JBSRQjR/output-onlinepngtools.png"
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
                      <div className="main">
                          {/* eslint-disable-next-line react/button-has-type */}
                      </div>

                  </li>
                  <li>
                      <Link to="/Saved">
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
