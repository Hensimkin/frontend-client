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
  const [Follow, setFollow] = useState([]);

  const fetchUserListings = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/User/${uid}`); // Pass the uid value in the URL
      setUserListings(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    fetchUserListings();
  }, [uid]); // Include uid as a dependency to refetch listings when it changes

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


  async function post(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/follow', { Follow });

    } catch (error) {
      console.log(error);
    }
  }

  const setFollowValue = (event) => {
    setFollow(uid);
    post(event)
  }

  return (
    <div>
      <h1 className="fontsP">{userListings.name} Profile</h1>
      <header className="header">
        <UserNavbar />
      </header>
      <div className="listings">
        <ul>
          {userListings.map((listing) => (
            <li key={listing.id}>
              <p>Title: {listing.title}</p>
              <p>Price: {listing.price}</p>
              <p>Category: {listing.category}</p>
              <p>Description: {listing.description}</p>
              <p>User: {listing.name}</p>
            </li>
          ))}
        </ul>
        <button type="button" onClick={setFollowValue}>
          Follow
        </button>
      </div>
    </div>
  );
}

export default User;
