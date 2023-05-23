/* eslint-disable */
import React, { useEffect, useState } from 'react';
import UserNavbar from './UserNavbar.js';
import './PersonalArea.css';
import './HomePage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function User() {
  const { uid } = useParams();
  const [userListings, setUserListings] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const fetchUserListings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/User/${uid}`);
      setUserListings(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, [uid]);

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

  const followUser = async () => {
    try {
      await axios.post('http://localhost:5000/follow', { uid });
      setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowUser = async () => {
    try {
      await axios.post('http://localhost:5000/unfollow', { uid });
      setIsFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFollow = () => {
    if (isFollowing) {
      unfollowUser();
    } else {
      followUser();
    }
  };

  return (
    <div>
      <h1 className="fontsP">{userListings.length > 0 ? `${userListings[0].name}'s Listings` : ''}</h1>
      <header className="header">
        <UserNavbar />
      </header>
      <div className="listings">
        <ul className="fontsP">
          {userListings.map((listing) => (
            <li key={listing.id}>
              <p>Title: {listing.title}</p>
              <p>Price: {listing.price}</p>
              <p>Category: {listing.category}</p>
              <p>Description: {listing.description}</p>
              {/* <p>User: {listing.name}</p> */}
            </li>
          ))}
        </ul>
        <button type="button" onClick={toggleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
}

export default User;
