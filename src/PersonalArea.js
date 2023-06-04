import React, { useEffect, useState } from 'react';
import EditProfile from './EditProfile.js';
import FollowersList from './FollowersList.js';
import FollowingList from './FollowingList.js';
import ChangePassword from './ChangePassword.js';
import UserNavbar from './UserNavbar.js';
import './PersonalArea.css';
import './HomePage.css';
// eslint-disable-next-line import/order
import axios from 'axios';

function PersonalArea() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isFollowersListOpen, setIsFollowersListOpen] = useState(false);
  const [isFollowingListOpen, setIsFollowingListOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [, setUserDetails] = useState([]);
  const [isGridView, setIsGridView] = useState(false); // Added state variable
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

  const handleChangePasswordClick = () => {
    setIsChangePasswordOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditProfileOpen(false);
    setIsFollowersListOpen(false);
    setIsFollowingListOpen(false);
    setIsChangePasswordOpen(false);
  };

  return (
      <div>
          <h1 className="listings">Profile</h1>
          <header className="header">
              <UserNavbar />
          </header>
          <main className="mainP">
              {/* eslint-disable-next-line react/button-has-type */}
              <button className="buttonP" onClick={handleEditProfileClick}>
                  Edit Profile
              </button>
              {/* eslint-disable-next-line react/button-has-type */}
              <button className="buttonP" onClick={handleFollowersListClick}>
                  Followers List
              </button>
              {/* eslint-disable-next-line react/button-has-type */}
              <button className="buttonP" onClick={handleFollowingListClick}>
                  Following List
              </button>
              {/* eslint-disable-next-line react/button-has-type */}
              <button className="buttonP" onClick={handleChangePasswordClick}>
                  Change Password
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
                          <p>
                              {(() => {
                                const images = [];
                                // eslint-disable-next-line no-plusplus
                                for (let i = 0; i < listing.pictures.length; i++) {
                                  // eslint-disable-next-line max-len,jsx-a11y/img-redundant-alt
                                  images.push(<img key={i} src={listing.pictures[i]} alt={`Picture ${i + 1}`} />);
                                }
                                return images;
                              })()}
                          </p>

                      </li>
                  ))}
              </ul>
          </div>
      </div>
  );
}

export default PersonalArea;
