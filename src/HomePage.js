/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cssFile.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Slide } from 'react-slideshow-image';
import UserNavbar from './UserNavbar.js';
import AddProductPopup from './AddProductPopup.js';
import ContactDetailsPopup from './ContactDetailsPopup.js';
import 'react-slideshow-image/dist/styles.css';


function HomePage() {
  const [addProductPopupIsOpen, setAddProductPopupIsOpen] = useState(false);
  const [contactDetailsPopupIsOpen, setContactDetailsPopupIsOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [userListings, setUserListings] = useState([]);
  let [filteredUserListings, setFilteredUserListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(false);
  const [likedListings, setLikedListings] = useState({});
  const [savedListings, setSavedListings] = useState({});


  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSavedDisabled, setIsSavedDisabled] = useState(false);
  const [userId, setUserId] = useState('');;
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
      const response = await axios.get('https://backend-server-qdnc.onrender.com/home_listings');
      setUserListings(response.data);
      const user = await axios.post('https://backend-server-qdnc.onrender.com/get_uid');
      setUserId(user.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, [filteredUserListings]); // Add filteredUserListings as a dependency


  const openAddProductPopup = () => {
    setAddProductPopupIsOpen(true);
  };

  const openContactDetailsPopup = (listing) => {
    setSelectedListing(listing);
    setContactDetailsPopupIsOpen(true);
  };

  const closeAddProductPopup = async () => {
    setAddProductPopupIsOpen(false);
    window.location.reload();
    await fetchUserListings();

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
      await axios.post('https://backend-server-qdnc.onrender.com/saveListing', { listingId, deleteOrSave });
    } catch (error) {
      console.error('Error saving listing:', error);
    }
    setIsSavedDisabled(false); // Enable the button
  };

  const likeListing = async (listing) => {
    const listingId = listing.id;
    const isListingLiked = likedListings[listingId] || false;
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
      console.error('Error saving listing:', error);
    }
    setIsButtonDisabled(false); // Enable the button
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://backend-server-qdnc.onrender.com/search_listings', {
        params: { search: searchTerm },
      });
      console.log(response.data); // Check the value of response.data
      setFilteredUserListings(response.data);

    } catch (error) {
      console.error('Error searching listings:', error);

    }
  };

  useEffect(() => {
    console.log(filteredUserListings.length);
  }, [filteredUserListings]);





  useEffect(() => {
    if (searchTerm === '') {
      setFilteredUserListings([]);
    } else {
      handleSearch();
    }
  }, [searchTerm]);



  return (
    <div className="">
      <header className="header">
        <UserNavbar />
      </header>
      <main className="main">
        {!addProductPopupIsOpen && (
          <button type="button" onClick={openAddProductPopup}>
            Add Product
          </button>
        )}
        <button type="button" onClick={() => setIsGridView(!isGridView)}>
          {isGridView ? 'Row View' : 'Grid View'}
        </button>
      </main>
      <input type="text" placeholder="Search User/Title" value={searchTerm} onChange={handleSearchChange} />
      <div className="listings fonts">
        <h2>Your Listings</h2>
        <ul className={`list ${isGridView ? 'grid-view' : ''}`} >
          {filteredUserListings.length > 0
            ? filteredUserListings.map((listing) => {
              const isListingLiked = likedListings[listing.id] || false;
              const isListingSaved = savedListings[listing.id] || false;
              return (
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
                    <p>
                      <span className="label">User:</span>
                      <span className="value">
                          <Link to={`/User/${listing.userid}`} style={{ color: '#0b6cb3', marginLeft: '2px' }}>
                            {listing.name}
                          </Link>
                        </span>
                    </p>
                  </div>
                  <div className={`slide-container ${addProductPopupIsOpen || contactDetailsPopupIsOpen ? 'hide-arrows' : ''}`}>
                    {listing.pictures.length > 0 && (
                      <Slide>
                        {listing.pictures.map((picture, index) => (
                          <img key={index} src={picture} alt={`Picture ${index + 1}`} />
                        ))}
                      </Slide>
                    )}
                  </div>
                  <div className="listing_buttons">
                    <button type="button" onClick={() => openContactDetailsPopup(listing)} className="buttonH">
                      <FontAwesomeIcon icon={faMessage} /> {/* Contact Details Icon */}
                    </button>
                    <button
                      type="button"
                      onClick={() => openSaveForLaterPage(listing)}
                      className="buttonH"
                      disabled={isSavedDisabled}
                    >
                      {isListingSaved ? (
                        <FontAwesomeIcon icon={faBookmark} style={{ color: 'cyan' }} />
                      ) : (
                        <FontAwesomeIcon icon={faBookmark} style={{ color: 'white' }} />
                      )}{' '}
                      {/* Like Icon */}
                    </button>
                    <button
                      type="button"
                      onClick={() => likeListing(listing)}
                      disabled={isButtonDisabled}
                      className={`buttonH ${isListingLiked ? 'liked' : ''}`}
                    >
                      {isListingLiked ? (
                        <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                      ) : (
                        <FontAwesomeIcon icon={faHeart} style={{ color: 'white' }} />
                      )}{' '}
                      {/* Like Icon */}
                    </button>
                  </div>
                </li>
              );
            })
            : searchTerm === '' && userListings.map((listing) => {
              const isListingLiked = likedListings[listing.id] || false;
              const isListingSaved = savedListings[listing.id] || false;
              return (
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
                    <p>
                      <span className="label">User:</span>
                      <span className="value">
                          <Link to={`/User/${listing.userid}`} style={{ color: '#0b6cb3', marginLeft: '2px' }}>
                            {listing.name}
                          </Link>
                        </span>
                    </p>
                  </div>
                  <div className={`slide-container ${addProductPopupIsOpen || contactDetailsPopupIsOpen ? 'hide-arrows' : ''}`}>
                    {listing.pictures.length > 0 && (
                      <Slide>
                        {listing.pictures.map((picture, index) => (
                          <img key={index} src={picture} alt={`Picture ${index + 1}`} />
                        ))}
                      </Slide>
                    )}
                  </div>
                  <div className="listing_buttons">
                    <button type="button" onClick={() => openContactDetailsPopup(listing)} className="buttonH">
                      <FontAwesomeIcon icon={faMessage} /> {/* Contact Details Icon */}
                    </button>
                    <button
                      type="button"
                      onClick={() => openSaveForLaterPage(listing)}
                      className="buttonH"
                      disabled={isSavedDisabled}
                    >
                      {isListingSaved ? (
                        <FontAwesomeIcon icon={faBookmark} style={{ color: 'cyan' }} />
                      ) : (
                        <FontAwesomeIcon icon={faBookmark} style={{ color: 'white' }} />
                      )}{' '}
                      {/* Like Icon */}
                    </button>
                    <button
                      type="button"
                      onClick={() => likeListing(listing)}
                      disabled={isButtonDisabled}
                      className={`buttonH ${isListingLiked ? 'liked' : ''}`}
                    >
                      {isListingLiked ? (
                        <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                      ) : (
                        <FontAwesomeIcon icon={faHeart} style={{ color: 'white' }} />
                      )}{' '}
                      {/* Like Icon */}
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      {addProductPopupIsOpen && <AddProductPopup closePopup={closeAddProductPopup} />}
      {contactDetailsPopupIsOpen && <ContactDetailsPopup listing={selectedListing} closePopup={closeContactDetailsPopup} />}
    </div>
  );
}

export default HomePage;
