/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './ProfilePopup.css';
import axios from 'axios';

function FollowersList({ onClose }) {
  const [followers, setFollowers] = useState([]);
  const [followersError, setFollowersError] = useState('');

  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/followers');
      setFollowers(response.data);
    } catch (error) {
      console.log(error);
      setFollowersError('Failed to fetch followers list.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="popup">
      <div onClick={onClose} className="overlay"></div>
      <div className="popup-inner">
        <span className="close-button" onClick={onClose}>
          x
        </span>
        <h1 className="head">Followers</h1>
        <form onSubmit={handleSubmit}>
          <br></br>
          <ul>
            {followers.map((follower, index) => (
              <li key={index}>{follower.name}</li>
            ))}
          </ul>
          {followersError && <p className="error-message">{followersError}</p>}
          <br></br>
          <button type="submit">Close</button>
        </form>
        <br></br>
      </div>
    </div>
  );
}

export default FollowersList;