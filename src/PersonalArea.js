/* eslint-disable */
import React, { useEffect, useState } from 'react'
import EditProfile from './EditProfile.js';
import FollowersList from './FollowersList.js';
import FollowingList from './FollowingList.js'
import UserNavbar from './UserNavbar.js'
import './PersonalArea.css';
import './HomePage.css';
import axios from 'axios';
import { Link } from 'react-router-dom'

function PersonalArea() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isFollowersListOpen, setIsFollowersListOpen] = useState(false);
  const [isFollowingListOpen, setIsFollowingListOpen] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [UserDetails, setUserDetails] = useState([]);

  const fetchUserListings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user_listings');
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
      const response = await axios.get('http://localhost:5000/user_details');
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

  const handleCloseModal = () => {
    setIsEditProfileOpen(false);
    setIsFollowersListOpen(false);
    setIsFollowingListOpen(false);
  };

  return (
    <div>
      <h1 className="fontsP">Profile</h1>
      <header className="header">
        <UserNavbar />
      </header>
      <main className="mainP">
      <button className="buttonP" onClick={handleEditProfileClick}>Edit Profile</button>
      <button className="buttonP" onClick={handleFollowersListClick}>Followers List</button>
      <button className="buttonP" onClick={handleFollowingListClick}>Following List</button>

      {isEditProfileOpen && (
        <EditProfile onClose={handleCloseModal} />
      )}

      {isFollowersListOpen && (
        <FollowersList onClose={handleCloseModal} />
      )}

      {isFollowingListOpen && (
        <FollowingList onClose={handleCloseModal} />
      )}
      </main>
      <div className="listings">
      <ul>
        {userListings.map((listing) => (
          <li key={listing.id}>
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
            <index  name={UserDetails.length > 0 ? UserDetails[0].uid : ''} />
            <p>
              User:
              <Link to={`/User/${UserDetails.length > 0 ? UserDetails[0].uid : ''}`}>
                {UserDetails.length > 0 ? UserDetails[0].name : ''}
              </Link>
            </p>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default PersonalArea;
