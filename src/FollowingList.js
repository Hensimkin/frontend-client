/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './cssFile.css';
import axios from 'axios';
import { Link } from 'react-router-dom'

function FollowingList({ onClose }) {
  const [following, setFollowing] = useState([]);
  const [followingError, setFollowingError] = useState('');

  useEffect(() => {
    fetchFollowing();
  }, []);

  const fetchFollowing = async () => {
    try {
      const response = await axios.get('https://backend-server-qdnc.onrender.com/following');
      setFollowing(response.data);
    } catch (error) {
      console.log(error);
      setFollowingError('Failed to fetch following list.');
    }
  };

  async function unfollowUser(e, unfollowedUser) {
    try {
      e.preventDefault();
      const response = await axios.post('https://backend-server-qdnc.onrender.com/unfollow', {
        unfollowedUser
      });
      console.log(response.data); // "Unfollow successful"
      setFollowing((prevFollowing) => prevFollowing.filter((user) => user.id !== unfollowedUser.id));
    } catch (error) {
      console.log(error);
      setFollowingError('Failed to unfollow user.');
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleUnfollow = (event, user) => {
    unfollowUser(event, user);
  };

  return (
    <div className="popup">
      <div onClick={onClose} className="overlay" />
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          x
        </span>
        <h1 className="head">Following</h1>
        <form onSubmit={handleSubmit}>
          <ul className="fonts">
            {following.map((user) => (
              <li key={user.id}>
                <span> {user.username}</span> {/* Display the username */}
                <div className="user-info">
                  <p>
                    <Link to={`/User/${user.id}`}>
                      {user.name}
                    </Link>
                  </p>
                  <button
                    className="unfollow-button"
                    type="button"
                    onClick={(event) => handleUnfollow(event, user)}
                  >
                    Unfollow
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {followingError && <p className="error-message">{followingError}</p>}
          <br />
          <button type="button" className="close-button2"  onClick={onClose}>
            Close
          </button>
        </form>
        <br />
      </div>
    </div>
  );
}

export default FollowingList;

