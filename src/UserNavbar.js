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
  const [bell,setbell]=useState('');

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('https://frontend-site.onrender.com/get_notifications');
      const user = await axios.post('https://frontend-site.onrender.com/get_uid');
      const user2=user.data;
      //setNotifications(response.data);
      const storedNotifications = JSON.parse(localStorage.getItem(`${user2}`)) || [];//return the stored not

      const newNotifications = response.data;
      const newNotificationsCount = countNewNotifications(newNotifications, storedNotifications);


      if (newNotificationsCount) {

        localStorage.setItem(`${user2}`, JSON.stringify(newNotifications));
        setNotifications(response.data);
        setbell("[New notification]");
      }
      else
      {
        setNotifications(storedNotifications);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const countNewNotifications = (newNotifications, storedNotifications) => {
    const newNotificationsString = JSON.stringify(newNotifications);
    const storedNotificationsString = JSON.stringify(storedNotifications);

    // Compare the strings to check if they are different
    return newNotificationsString !== storedNotificationsString;
  };


  const handleLogout = async () => {
    await axios.post('https://backend-server-qdnc.onrender.com/signOut');
  };

  const handleNotificationClick = () => {
    setShowWindow(!showWindow);
    setbell('');
    // document.body.style.overflow = showWindow ? 'auto' : 'hidden';
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
            <button onClick={handleNotificationClick} className="notification-button ">
              <FontAwesomeIcon icon={faBell} />
              {bell && (
                <span className="bell-message" style={{ right: '100px' }}>{bell}</span>
              )}
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
                        <br/>
                        <br/>

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
