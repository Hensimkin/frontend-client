/* eslint-disable */
import React, { useState } from 'react';
import './Follow.css'

function FollowingList({ onClose }) {
  // Dummy data for following
  const followers = [
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
    { id: 3, username: 'user3' },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleUnfollow = (followerId) => {
    // Logic to unfollow the user with the provided followerId
    console.log(`Unfollow user with ID: ${followerId}`);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <span className="close-button" onClick={onClose}>
          x
        </span>
        <h1 className="head">Followers</h1>
        <form onSubmit={handleSubmit}>
          <ul className="followers-list">
            {followers.map((follower) => (
              <li key={follower.id} className="follower-item">
                <a href={`/${follower.username}`}>{follower.username}</a>
                <button
                  type="button"
                  onClick={() => handleUnfollow(follower.id)}
                  className="unfollow-button"
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
