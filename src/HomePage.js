import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
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
  const [filteredUserListings, setFilteredUserListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(false);
  const [likedListings, setLikedListings] = useState({}); // Track liked state for each listing
  const fetchUserListings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/home_listings');
      setUserListings(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line max-len
    const filteredListings = userListings.filter((listing) => listing.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUserListings(filteredListings);
  }, [userListings, searchTerm]);

  useEffect(() => {
    const savedLikedState = localStorage.getItem('likedListings');
    if (savedLikedState) {
      setLikedListings(JSON.parse(savedLikedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likedListings', JSON.stringify(likedListings));
  }, [likedListings]);

  const openAddProductPopup = () => {
    setAddProductPopupIsOpen(true);
  };

  const openContactDetailsPopup = (listing) => {
    setSelectedListing(listing);
    setContactDetailsPopupIsOpen(true);
  };

  const closeAddProductPopup = async () => {
    setAddProductPopupIsOpen(false);
    await fetchUserListings();
    window.location.reload();
  };

  const closeContactDetailsPopup = () => {
    setContactDetailsPopupIsOpen(false);
    setSelectedListing(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const saveListingForLater = async (listing, userId) => {
    try {
      await axios.post('http://localhost:5000/save', { listing, userId });
    } catch (error) {
      throw new Error('Error saving listing:', error);
    }
  };

  const openSaveForLaterPage = async (listing) => {
    const userId = listing.userid;

    try {
      await saveListingForLater(listing, userId);
      console.log(`Listing saved for later in user with ID ${userId}`);
    } catch (error) {
      console.error('Error saving listing:', error);
    }
  };

  const likeListing = async (listing) => {
    const listingId = listing.id;
    const isListingLiked = likedListings[listingId] || false;

    try {
      const updatedLikedListings = {
        ...likedListings,
        [listingId]: !isListingLiked,
      };
      setLikedListings(updatedLikedListings);

      localStorage.setItem('likedListings', JSON.stringify(updatedLikedListings));

      await axios.post('http://localhost:5000/likeListing', {
        listing,
        isLiked: !isListingLiked,
      });
    } catch (error) {
      throw new Error('Error saving listing:', error);
    }
  };

  return (
      <div className="">
          <header className="header">
              <UserNavbar handleSearchChange={handleSearchChange} />
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
              {' '}
          </main>
          <div className="listings fonts">
              <h2>Your Listings</h2>
              <ul className={`list ${isGridView ? 'grid-view' : ''}`}>
                  {filteredUserListings.map((listing) => {
                    const isListingLiked = likedListings[listing.id] || false;
                    return (
                        <li key={listing.userid}>
                            <div className="left">
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
                                    <p>
                                        Likes:
                                        {listing.likes}
                                    </p>
                                    User:
                                    <Link to={`/User/${listing.userid}`}>{listing.name}</Link>
                                </p>
                            </div>
                            <div className="right">
                                <Slide>
                                    {listing.pictures.map((picture, index) => (
                                      // eslint-disable-next-line max-len
                                      // eslint-disable-next-line max-len,jsx-a11y/img-redundant-alt,react/no-array-index-key
                                        <img key={index} src={picture} alt={`Picture ${index + 1}`} />
                                    ))}
                                </Slide>
                            </div>
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
                            >
                                <FontAwesomeIcon icon={faBookmark} />
                                {' '}
                                {/* Save for Later Icon */}
                            </button>
                            <button
                              type="button"
                              onClick={() => likeListing(listing)}
                              className={`buttonH ${isListingLiked ? 'liked' : ''}`}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                                {' '}
                                {/* Like Icon */}
                            </button>
                        </li>
                    );
                  })}
              </ul>
          </div>
          {addProductPopupIsOpen && <AddProductPopup closePopup={closeAddProductPopup} />}
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

export default HomePage;
