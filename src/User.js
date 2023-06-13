/* eslint-disable */
import React, { useEffect, useState } from 'react';
import UserNavbar from './UserNavbar.js';
import './cssFile.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons'

function User() {
  const { uid } = useParams();
  const [userListings, setUserListings] = useState([]);
  const [userSharedListings, setUserSharedListings] = useState([]);

  const [userDetails, setUserDetails] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [isGridView, setIsGridView] = useState(false);
  const [likedListings, setLikedListings] = useState({});
  const [savedListings, setSavedListings] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSavedDisabled, setIsSavedDisabled] = useState(false);
  const [userId, setUserId] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    fetchUserListings();
    fetchUserDetails();
    checkIfFollowing();
    checkIfBlocked();
  }, [uid]);

  useEffect(() => {
    const savedLikedState = localStorage.getItem(`${userId}`);
    const savedSavedState = localStorage.getItem(`${userId}1`);
    if (savedLikedState) {
      setLikedListings(JSON.parse(savedLikedState));
    }
    if (savedSavedState) {
      setSavedListings(JSON.parse(savedSavedState));
    }
  }, [userId]);

  const fetchUserListings = async () => {
    try {
      const response = await axios.get(`https://backend-server-qdnc.onrender.com/User/${uid}`);
      setUserListings(response.data);
      const shareResponse = await axios.get(`https://backend-server-qdnc.onrender.com/UserShareListing/${uid}`);
      setUserSharedListings(shareResponse.data);

      const user = await axios.post('https://backend-server-qdnc.onrender.com/get_uid');
      setUserId(user.data);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`https://backend-server-qdnc.onrender.com/user_details/${uid}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const checkIfFollowing = async () => {
    try {
      const response = await axios.get('https://backend-server-qdnc.onrender.com/following');
      const followingList = response.data;
      const isFollowingUser = followingList.some((user) => user.id === uid);
      setIsFollowing(isFollowingUser);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const followUser = async () => {
    try {
      await axios.post('https://backend-server-qdnc.onrender.com/follow', {
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
      await axios.post('https://backend-server-qdnc.onrender.com/unfollow', {
        unfollowedUser: {
          id: uid,
        },
      });
      setIsFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };


  const checkIfBlocked = async () => {
    try {
      const response = await axios.get('https://backend-server-qdnc.onrender.com/check_blocked');
      const blockedList = response.data;
      const isBlockedUser = blockedList.some((user) => user.id === uid);
      setIsBlocked(isBlockedUser);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const blockUser = async () => {
    try {
      await axios.post('https://backend-server-qdnc.onrender.com/block-user', {
        uid,
      });
      setIsBlocked(true);
    } catch (error) {
      console.log(error);
    }
  };

  const unblockUser = async () => {
    try {
      await axios.post('https://backend-server-qdnc.onrender.com/block-user', {
        uid,
      });
      setIsBlocked(false);
    } catch (error) {
      console.log(error);
    }
  };




  const toggleBlock = () => {
    if (isBlocked) {
      unblockUser();
    } else {
      blockUser();
    }
  };



  const toggleFollow = () => {
    if (isFollowing) {
      unfollowUser();
    } else {
      followUser();
    }
  };

  const openSaveForLaterPage = async (listing) => {
    const listingId = listing.id;
    const isListingSaved = savedListings[listingId] || false;
    setIsSavedDisabled(true); // Disable the button

    try {
      const updatedSavedListings = {
        ...savedListings,
        [listingId]: !isListingSaved,
      };
      setSavedListings(updatedSavedListings);
      localStorage.setItem(`${userId}1`, JSON.stringify(updatedSavedListings));
      const deleteOrSave = isListingSaved ? 'delete' : 'save';
      await axios.post('https://backend-server-qdnc.onrender.com/saveListing', { listingId, deleteOrSave });
    } catch (error) {
      console.error('Error saving listing:', error);
    }
    setIsSavedDisabled(false); // Disable the button
  };

  const likeListing = async (listing) => {
    const listingId = listing.id;
    const isListingLiked = likedListings[listingId] || false;
    // eslint-disable-next-line max-len
    const updatedListing = { ...listing, likes: isListingLiked ? listing.likes - 1 : listing.likes + 1 };
    setIsButtonDisabled(true); // Disable the button
    try {
      const updatedLikedListings = {
        ...likedListings,
        [listingId]: !isListingLiked,
      };
      setLikedListings(updatedLikedListings);
      localStorage.setItem(`${userId}`, JSON.stringify(updatedLikedListings));

      await axios.post('https://backend-server-qdnc.onrender.com/likeListing', {
        listing: updatedListing,
        isLiked: !isListingLiked,
      });

      const updatedUserListings = userListings.map((item) => {
        if (item.id === listingId) {
          return updatedListing;
        }
        return item;
      });

      setUserListings(updatedUserListings);
    } catch (error) {
      throw new Error('Error saving listing:', error);
    }
    setIsButtonDisabled(false); // Enable the button
  };

  return (
    <div>
      <h1 className="listings">{userListings.length > 0 ? `${userListings[0].name}'s Listings` : ''}</h1>
      <header className="header">
        <UserNavbar />
      </header>
      {/* <main className="main"> */}
      {/*   <button type="button" onClick={() => setIsGridView(!isGridView)}> */}
      {/*     {isGridView ? 'Row View' : 'Grid View'} */}
      {/*   </button> */}
      {/* </main> */}
      <main className="main">
        <button type="button" onClick={toggleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
        <button type="button" onClick={toggleBlock}>
          {isBlocked ? 'Unblock' : 'Block'}
        </button>
      </main>
      <div className="listings">
        <ul className={`list ${isGridView ? 'grid-view' : ''}`}>
          {userListings.map((listing) => {
            const isListingLiked = likedListings[listing.id] || false;
            const isListingSaved = savedListings[listing.id] || false;
            return (
              <li key={listing.userid}>
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
                  <p>
                    <span className="label">User:</span>
                    <span className="value">
                                        {/* eslint-disable-next-line max-len */}
                      <Link to={`/User/${listing.userid}`} style={{ color: '#0b6cb3', marginLeft: '2px' }}>
                                            {listing.name}
                                        </Link>
                                    </span>
                  </p>
                </div>
                {/* eslint-disable-next-line max-len */}
                <div className="slide-container">
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
                <div className="listing_buttons">
                  <button
                    type="button"
                    onClick={() => openContactDetailsPopup(listing)}
                    className="buttonH"
                  >
                    <FontAwesomeIcon icon={faMessage} />
                    {' '}
                    {/* Contact Details Icon */}
                  </button>
                  <button
                    type="button"
                    onClick={() => openSaveForLaterPage(listing)}
                    className="buttonH"
                    disabled={isSavedDisabled}
                  >
                    {isListingSaved ? (
                      <>
                        {/* eslint-disable-next-line max-len */}
                        <FontAwesomeIcon icon={faBookmark} style={{ color: 'cyan' }} />
                      </>
                    ) : (
                      <>
                        {/* eslint-disable-next-line max-len */}
                        <FontAwesomeIcon icon={faBookmark} style={{ color: 'white' }} />
                      </>
                    )}
                    {' '}
                    {/* Like Icon */}
                  </button>
                  <button
                    type="button"
                    onClick={() => likeListing(listing)}
                    disabled={isButtonDisabled} // Update the disabled attribute
                    className={`buttonH ${isListingLiked ? 'liked' : ''}`}
                  >
                    {isListingLiked ? (
                      <>
                        {/* eslint-disable-next-line max-len */}
                        <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                      </>
                    ) : (
                      <>
                        {/* eslint-disable-next-line max-len */}
                        <FontAwesomeIcon icon={faHeart} style={{ color: 'white' }} />
                      </>
                    )}
                    {' '}
                    {/* Like Icon */}
                  </button>

                </div>
              </li>
            );
          })}
        </ul>

      </div>
      <div className="listings">
        <h1 className="fonts">Shared Listings</h1>

        <ul className={`list ${isGridView ? 'grid-view' : ''}`}>
          {userSharedListings.map((listing) => {
            const isListingLiked = likedListings[listing.id] || false;
            const isListingSaved = savedListings[listing.id] || false;
            return (
              <li key={listing.userid}>
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
                  <p>
                    <span className="label">User:</span>
                    <span className="value">
                                        {/* eslint-disable-next-line max-len */}
                      <Link to={`/User/${listing.userid}`} style={{ color: '#0b6cb3', marginLeft: '2px' }}>
                                            {listing.name}
                                        </Link>
                                    </span>
                  </p>
                </div>
                {/* eslint-disable-next-line max-len */}
                <div className="slide-container">
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
                <div className="listing_buttons">
                  <button
                    type="button"
                    onClick={() => openContactDetailsPopup(listing)}
                    className="buttonH"
                  >
                    <FontAwesomeIcon icon={faMessage} />
                    {' '}
                    {/* Contact Details Icon */}
                  </button>
                  <button
                    type="button"
                    onClick={() => openSaveForLaterPage(listing)}
                    className="buttonH"
                    disabled={isSavedDisabled}
                  >
                    {isListingSaved ? (
                      <>
                        {/* eslint-disable-next-line max-len */}
                        <FontAwesomeIcon icon={faBookmark} style={{ color: 'cyan' }} />
                      </>
                    ) : (
                      <>
                        {/* eslint-disable-next-line max-len */}
                        <FontAwesomeIcon icon={faBookmark} style={{ color: 'white' }} />
                      </>
                    )}
                    {' '}
                    {/* Like Icon */}
                  </button>
                  <button
                    type="button"
                    onClick={() => likeListing(listing)}
                    disabled={isButtonDisabled} // Update the disabled attribute
                    className={`buttonH ${isListingLiked ? 'liked' : ''}`}
                  >
                    {isListingLiked ? (
                      <>
                        {/* eslint-disable-next-line max-len */}
                        <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                      </>
                    ) : (
                      <>
                        {/* eslint-disable-next-line max-len */}
                        <FontAwesomeIcon icon={faHeart} style={{ color: 'white' }} />
                      </>
                    )}
                    {' '}
                    {/* Like Icon */}
                  </button>

                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default User;

