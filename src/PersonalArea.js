/* eslint-disable */
import React, { useEffect, useState } from 'react';
import EditProfile from './EditProfile.js';
import StatsInfo from './StatsInfo.js';
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
import { Link } from 'react-router-dom'

function PersonalArea() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isStatsticsOpen, setisStatsticsOpen] = useState(false);

  const [isFollowersListOpen, setIsFollowersListOpen] = useState(false);
  const [isFollowingListOpen, setIsFollowingListOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [, setUserDetails] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editListingId, setEditListingId] = useState(null);
  // const [statsInfo, setStatsInfo] = useState({
  //   totalLikes: 0,
  //   followers: 0,
  //   following: 0,
  //   avgLikes: 0,
  // });
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
      // const statsResponse = await axios.post('https://http://localhost:5000/getStatistics',{statsInfo});
      // setStatsInfo(statsResponse.data.stats);
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

  const handleStatisticsClick = () => {
    setisStatsticsOpen(true);
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
    setisStatsticsOpen(false);
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
        <button className="buttonP" onClick={handleStatisticsClick}>
          Statistics
        </button>

        {isEditProfileOpen && <EditProfile onClose={handleCloseModal} />}
        {isStatsticsOpen && <StatsInfo onClose={handleCloseModal} />}
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
              <div className="listing-details">

                <p>
                  <span className="label">Title:</span>
                  <span className="value">{listing.title}</span>
                </p>
                <p>
                  <span className="label">Price:</span>
                  <span className="value">{listing.price}</span>
                </p>
                <p>
                  <span className="label">Category:</span>
                  <span className="value">{listing.category}</span>
                </p>
                <p>
                  <span className="label">Description:</span>
                  <span className="value">{listing.description}</span>
                </p>
                <p>
                  <span className="label">Likes:</span>
                  <span className="value">{listing.likes}</span>
                </p>
              </div>
              {/* eslint-disable-next-line max-len */}
              <div className={`slide-container ${isEditProfileOpen || isFollowersListOpen || isFollowingListOpen || isChangePasswordOpen || isStatsticsOpen ? 'hide-arrows' : ''}`}>
                {listing.pictures.length > 0 && (
                  <Slide>
                    {listing.pictures.map((picture, index) => (
                      // eslint-disable-next-line max-len
                      // eslint-disable-next-line max-len,react/no-array-index-key,jsx-a11y/img-redundant-alt
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
