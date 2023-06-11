/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark, faHome, faUser, faSignOutAlt, faBell, faHeart,
} from '@fortawesome/free-solid-svg-icons'

function UserNavbar() {
  const [showWindow, setShowWindow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_notifications');
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await axios.post('http://localhost:5000/signOut');
  };

  const handleNotificationClick = () => {
    setShowWindow(!showWindow);
  };

  const handleCloseClick = () => {
    setShowWindow(false);
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
                  <li>
                      <Link to="/Saved">
                          <FontAwesomeIcon icon={faBookmark} />
                      </Link>
                  </li>
                  <li>
                      <Link to="/Liked">
                          <FontAwesomeIcon icon={faHeart} />
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
                      {/* eslint-disable-next-line react/button-has-type */}
                      <button onClick={handleNotificationClick} className="notification-button">
                          <FontAwesomeIcon icon={faBell} />
                      </button>
                      {showWindow && (
                      <div className="notification-window">
                          {/* eslint-disable-next-line react/button-has-type */}
                          <button className="close-button" onClick={handleCloseClick}>×</button>
                          {loading ? (
                              <p>Loading notifications...</p>
                          ) : (
                              <ul>
                                  {notifications.map((notifications, index) => (

                                      <li key={index}>
                                          {notifications}
                                      </li>
                                  ))}
                              </ul>

                          )}
                      </div>
                      )}
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
