/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './cssFile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FollowersList({ onClose }) {
  const [followers, setFollowers] = useState([]);
  const [followersError, setFollowersError] = useState('');

  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    try {
      const response = await axios.get('https://backend-server-qdnc.onrender.com/followers');
      setFollowers(response.data);
    } catch (error) {
      console.log(error);
      setFollowersError('There is no followers.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="popup">
      <div onClick={onClose} className="overlay"></div>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          x
        </span>
        <h1 className="head">Followers</h1>
        <form onSubmit={handleSubmit}>
          <br></br>
          <ul >
            {followers.map((follower, index) => (
              <li key={index}>
                <Link to={`/User/${follower.id}`} className="fonts followers">
                  {follower.name}
                </Link>
              </li>
            ))}
          </ul>
          {followersError && <p className="error-message">{followersError}</p>}
          <br></br>
          <button type="submit" className="close-button2" >Close</button>
        </form>
        <br></br>
      </div>
    </div>
  );
}

export default FollowersList;
