/* eslint-disable */
import React, { useEffect, useState } from 'react';
import UserNavbar from './UserNavbar.js';
import './cssFile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function User() {
  const { uid } = useParams();
  const [userListings, setUserListings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    fetchUserListings();
    fetchUserDetails();
    checkIfFollowing();
  }, [uid]);

  const fetchUserListings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/User/${uid}`);
      setUserListings(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user_details/${uid}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const checkIfFollowing = async () => {
    try {
      const response = await axios.get('http://localhost:5000/following');
      const followingList = response.data;
      const isFollowingUser = followingList.some((user) => user.id === uid);
      setIsFollowing(isFollowingUser);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const followUser = async () => {
    try {
      await axios.post('http://localhost:5000/follow', {
        uid,
        currentUserUid: userDetails.uid,
      });
      setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowUser = async () => {
    try {
      await axios.post('http://localhost:5000/unfollow', {
        unfollowedUser: {
          id: uid,
        },
      });
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
      <h1 className="listings">{userListings.length > 0 ? `${userListings[0].name}'s Listings` : ''}</h1>
      <header className="header">
        <UserNavbar />
      </header>
      <main className="main">
        <button type="button" onClick={() => setIsGridView(!isGridView)}>
          {isGridView ? 'Row View' : 'Grid View'}
        </button>
      </main>
      <div className="listings">
        <ul className={`list ${isGridView ? 'grid-view' : ''}`}>
          {userListings.map((listing) => (
            <li key={listing.id}>
              <p>Title: {listing.title}</p>
              <p>Price: {listing.price}</p>
              <p>Category: {listing.category}</p>
              <p>Description: {listing.description}</p>
            </li>
          ))}
        </ul>
        <main className="main">
          <button type="button" onClick={toggleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </main>
      </div>
    </div>
  );
}

export default User;

