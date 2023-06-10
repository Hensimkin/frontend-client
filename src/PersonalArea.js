/* eslint-disable */
import React, { useEffect, useState } from 'react';
import EditProfile from './EditProfile.js';
import FollowersList from './FollowersList.js';
import FollowingList from './FollowingList.js';
import ChangePassword from './ChangePassword.js';
import DeleteAccount from './DeleteAccount.js';
import EditListing from './EditListing.js';
import UserNavbar from './UserNavbar.js';
import './cssFile.css';
import axios from 'axios';
import { Slide } from 'react-slideshow-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons';

function PersonalArea() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isFollowersListOpen, setIsFollowersListOpen] = useState(false);
  const [isFollowingListOpen, setIsFollowingListOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [, setUserDetails] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editListingId, setEditListingId] = useState(null);

  const fetchUserListings = async () => {
    try {
      const response = await axios.get('https://backend-server-qdnc.onrender.com/user_listings');
      setUserListings(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('https://backend-server-qdnc.onrender.com/user_details');
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleFollowersListClick = () => {
    setIsFollowersListOpen(true);
  };

  const handleFollowingListClick = () => {
    setIsFollowingListOpen(true);
  };

  const handleChangePasswordClick = () => {
    setIsChangePasswordOpen(true);
  };

  const handleDeleteAccountClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCloseModal = () => {
    setIsEditProfileOpen(false);
    setIsFollowersListOpen(false);
    setIsFollowingListOpen(false);
    setIsChangePasswordOpen(false);
    setShowDeleteConfirmation(false);
    setEditListingId(null);
  };

  const handleEditListing = (listingId) => {
    setEditListingId(listingId);
  };

  return (
    <div>
      <h1 className="listings">Profile</h1>
      <header className="header">
        <UserNavbar />
      </header>
      <main className="mainP">
        <button className="buttonP" onClick={handleEditProfileClick}>
          Edit Profile
        </button>
        <button className="buttonP" onClick={handleFollowersListClick}>
          Followers List
        </button>
        <button className="buttonP" onClick={handleFollowingListClick}>
          Following List
        </button>
        <button className="buttonP" onClick={handleChangePasswordClick}>
          Change Password
        </button>
        <button className="buttonP" onClick={handleDeleteAccountClick}>
          Delete Account
        </button>

        {isEditProfileOpen && <EditProfile onClose={handleCloseModal} />}
        {isFollowersListOpen && <FollowersList onClose={handleCloseModal} />}
        {isFollowingListOpen && <FollowingList onClose={handleCloseModal} />}
        {isChangePasswordOpen && <ChangePassword onClose={handleCloseModal} />}

        <button type="button" className="buttonP" onClick={() => setIsGridView(!isGridView)}>
          {isGridView ? 'Row View' : 'Grid View'}
        </button>
      </main>
      <div className="listings">
        <ul className={`list ${isGridView ? 'grid-view' : ''}`}>
          {userListings.map((listing) => (
            <li key={listing.id}>
              <div className="left">
                <p>
                  Title:
                  {listing.title}
                </p>
                <p>
                  Price:
                  {listing.price}
                </p>
                <p>
                  Category:
                  {listing.category}
                </p>
                <p>
                  Description:
                  {listing.description}
                </p>
              </div>
              <div className={`slide-container ${isEditProfileOpen || isFollowersListOpen || isFollowingListOpen || isChangePasswordOpen || showDeleteConfirmation || editListingId ? 'hide-arrows' : ''}`}>
                {listing.pictures.length > 0 && (
                  <Slide>
                    {listing.pictures.map((picture, index) => (
                      <img key={index} src={picture} alt={`Picture ${index + 1}`} />
                    ))}
                  </Slide>
                )}
              </div>
              <div className="actions">
                <button className="edit-button" onClick={() => handleEditListing(listing.id)}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showDeleteConfirmation && <DeleteAccount onClose={handleCloseModal} />}
      {editListingId && <EditListing listingId={editListingId} onClose={handleCloseModal} />}
    </div>
  );
}

export default PersonalArea;
