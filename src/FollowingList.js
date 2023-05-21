import React, { useState } from 'react';
import './ProfilePopup.css';

function FollowingList({ onClose }) {
  const [followers, setFollowers] = useState([
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
    { id: 3, username: 'user3' },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleUnfollow = (followerId) => {
    // Logic to unfollow the user with the provided followerId
    console.log( followerId )
    setFollowers((prevFollowers) =>
      prevFollowers.filter((follower) => follower.id !== followerId)
    );
  };

  return (
    <div className="modal">
      <div onClick={onClose} className="overlay"></div>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          x
        </span>
        <h1 className="head">Followers</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {followers.map((follower) => (
              <li key={follower.id}>
                <a href={`/${follower.username}`}>{follower.username}</a>
                <button
                  className="unfollow-button" type="button"
                  onClick={() => handleUnfollow(follower.id)}
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
