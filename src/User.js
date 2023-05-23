import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/order
import UserNavbar from './UserNavbar.js';
import './PersonalArea.css';
import './HomePage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function User() {
  const { uid } = useParams();
  const [userListings, setUserListings] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [isGridView, setIsGridView] = useState(false); // Added state variable

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
      const response = await axios.get(`http://localhost:5000/user_details/${uid}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [uid]);

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
        uid,
        currentUserUid: userDetails.uid,
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
          {/* eslint-disable-next-line max-len */}
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
                  {' '}
                  {/* Added dynamic class */}
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
