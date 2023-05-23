/* eslint-disable */
import React, { useState } from 'react';
import './ProfilePopup.css';
import axios from 'axios';

function FollowingList({ onClose }) {
  const [followers, setFollowers] = useState([
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
    { id: 3, username: 'user3' },
  ]);

  const [followerError, setFollowerError] = useState('');

  async function post(unfollowedUser) {
    try {
      const responseUnfollow = await axios.post('http://localhost:5000/unfollow', { unfollowedUser });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleUnfollow = (event) => {
    const value = event.target.value;
    const unfollowedUser = followers.find((follower) => follower.username === value);

    if (unfollowedUser) {
      setFollowers((prevFollowers) =>
        prevFollowers.filter((follower) => follower.id !== unfollowedUser.id)
      );
      post(unfollowedUser);
    }
  };

  return (
    <div className="modal">
      <div onClick={onClose} className="overlay"></div>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          x
        </span>
        <h1 className="head">Following</h1>
        <form onSubmit={handleSubmit}>
          <ul className="fonts">
            {followers.map((follower) => (
              <li key={follower.id}>
                <a href={`/${follower.username}`}>{follower.username}</a>
                <button
                  className="unfollow-button"
                  type="button"
                  value={follower.username}
                  onClick={handleUnfollow}
                >
                  Unfollow
                </button>
              </li>
            ))}
          </ul>
          <br />
          <button type="submit">Close</button>
        </form>
        <br />
      </div>
    </div>
  );
}

export default FollowingList;
