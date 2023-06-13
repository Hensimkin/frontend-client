import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './cssFile.css';
import { Slide } from 'react-slideshow-image';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import UserNavbar from './UserNavbar.js';
import ContactDetailsPopup from './ContactDetailsPopup.js';

function SavedListings() {
  const [savedListingsId, setSavedListingsId] = useState([]);
  const [contactDetailsPopupIsOpen, setContactDetailsPopupIsOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
  const [likedListings, setLikedListings] = useState({});
  const [savedListings, setSavedListings] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSavedDisabled, setIsSavedDisabled] = useState(false);
  const [userId, setUserId] = useState('');
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

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchSavedListings();
  }, []);

  const fetchSavedListings = async () => {
    try {
      const response = await fetch('https://backend-server-qdnc.onrender.com/returnSavedListing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const savedListingsData = await response.json();
        setSavedListingsId(savedListingsData);
        const user = await axios.post('https://backend-server-qdnc.onrender.com/get_uid');
        setUserId(user.data);
      } else {
        console.error('Failed to fetch saved listings');
      }
    } catch (error) {
      console.error('Error fetching saved listings:', error);
    }
  };

  const openContactDetailsPopup = (listing) => {
    setSelectedListing(listing);
    setContactDetailsPopupIsOpen(true);
  };
  const closeContactDetailsPopup = () => {
    setContactDetailsPopupIsOpen(false);
    setSelectedListing(null);
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
      // eslint-disable-next-line max-len
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
      <div className="">
          <header className="header">
              <UserNavbar />
          </header>
          <main className="main">
              <button type="button" onClick={() => setIsGridView(!isGridView)}>
                  {isGridView ? 'Row View' : 'Grid View'}
              </button>
              {' '}
          </main>
          <div className="listings fonts">
              <h2>My saved listings</h2>
              <ul className={`list ${isGridView ? 'grid-view' : ''}`}>
                  {savedListingsId.map((listing) => {
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
          {contactDetailsPopupIsOpen && selectedListing && (
          <ContactDetailsPopup
            listing={selectedListing}
            phoneNumber={selectedListing.phoneNumber}
            name={selectedListing.name}
            closePopup={closeContactDetailsPopup}
          />
          )}
      </div>
  );
}

export default SavedListings;
