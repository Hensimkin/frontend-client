import React, { useState } from 'react';
import EditProfile from './EditProfile.js';
import FollowersList from './FollowersList.js';
import FollowingList from './FollowingList.js'
import Navbar from './Navbar.js';

function PersonalArea() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isFollowersListOpen, setIsFollowersListOpen] = useState(false);
  const [isFollowingListOpen, setIsFollowingListOpen] = useState(false);


  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleFollowersListClick = () => {
    setIsFollowersListOpen(true);
  };

  const handleFollowingListClick = () => {
    setIsFollowingListOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditProfileOpen(false);
    setIsFollowersListOpen(false);
    setIsFollowingListOpen(false);
  };

  return (
    <div>
      <h1>Profile</h1>
      <header className="header">
        <Navbar />
      </header>
      <button onClick={handleEditProfileClick}>Edit Profile</button>
      <button onClick={handleFollowersListClick}>Followers List</button>
      <button onClick={handleFollowingListClick}>Following List</button>


      {isEditProfileOpen && (
        <EditProfile onClose={handleCloseModal} />
      )}

      {isFollowersListOpen && (
        <FollowersList onClose={handleCloseModal} />
      )}

      {isFollowingListOpen && (
        <FollowingList onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default PersonalArea;