/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Slide } from 'react-slideshow-image';
import UserNavbar from './UserNavbar.js';
import AddProductPopup from './AddProductPopup.js';
import ContactDetailsPopup from './ContactDetailsPopup.js';
// eslint-disable-next-line import/no-unresolved
import 'react-slideshow-image/dist/styles.css';

function HomePage() {
  const [addProductPopupIsOpen, setAddProductPopupIsOpen] = useState(false);
  const [contactDetailsPopupIsOpen, setContactDetailsPopupIsOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [filteredUserListings, setFilteredUserListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(false); // Added state variable

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
    // Filter the user listings based on the search term
    // eslint-disable-next-line max-len
    const filteredListings = userListings.filter((listing) => listing.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredUserListings(filteredListings);
  }, [userListings, searchTerm]);

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
      // window.location.href = '/Saved';
    } catch (error) {
      console.error('Error saving listing:', error);
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
              {/* Added button for view mode */}
          </main>
          <div className="listings fonts">
                  <h2>Your Listings</h2>
                  <ul className={`list ${isGridView ? 'grid-view' : ''}`}>
                      {' '}
                      {/* Added dynamic class */}
                      {filteredUserListings.map((listing) => (
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
                            </div>
                                  <div className="right">
                                      <Slide>
                                          {(() => {
                                            const images = [];
                                            // eslint-disable-next-line no-plusplus
                                            for (let i = 0; i < listing.pictures.length; i++) {
                                            // eslint-disable-next-line max-len
                                            // eslint-disable-next-line max-len,jsx-a11y/img-redundant-alt
                                              images.push(<img key={i} src={listing.pictures[i]} alt={`Picture ${i + 1}`} />);
                                            }
                                            return images;
                                          })()}
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
                          </li>
                      ))}
                  </ul>
          </div>
          {addProductPopupIsOpen && (
          <AddProductPopup closePopup={closeAddProductPopup} />
          )}
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
