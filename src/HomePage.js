/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import './HomePage.css';
import UserNavbar from './UserNavbar.js';
import AddProductPopup from './AddProductPopup.js';
import ContactDetailsPopup from './ContactDetailsPopup.js';
import { Link } from 'react-router-dom'


function HomePage() {
  const [addProductPopupIsOpen, setAddProductPopupIsOpen] = useState(false);
  const [contactDetailsPopupIsOpen, setContactDetailsPopupIsOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [filteredUserListings, setFilteredUserListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    const filteredListings = userListings.filter(listing =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
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

  const handleMouseOver = (userId) => {
    fetchUserListings(userId);
  };

  return (
    <div className="App">
      <header className="header">
        <UserNavbar handleSearchChange={handleSearchChange} />
      </header>
      <main className="main">
        {!addProductPopupIsOpen && (
          <button type="button" onClick={openAddProductPopup}>
            Add Product
          </button>
        )}
        {/* Rest of the code... */}
      </main>
      <div className="listings">
        <div className="fonts">
          <h3>Your Listings</h3>
          <ul>
            {filteredUserListings.map((listing) => (
              <li key={listing.userid}>
                <p>Title: {listing.title}</p>
                <p>Price: {listing.price}</p>
                <p>Category: {listing.category}</p>
                <p>Description: {listing.description}</p>
                <p>check: {listing.userid}</p>
                <p>User:
                  <Link to={`/User/${listing.userid}`} onMouseOver={() => handleMouseOver(listing.userid)}>
                    {listing.name}
                  </Link>
                </p>
                <button
                  type="button"
                  onClick={() => openContactDetailsPopup(listing)}
                  className="button2"
                >
                  Contact Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {addProductPopupIsOpen && (
        <AddProductPopup closePopup={closeAddProductPopup} />
      )}
      {contactDetailsPopupIsOpen && selectedListing && (
        <ContactDetailsPopup
          listing={selectedListing}
          phoneNumber={selectedListing.phoneNumber}
          closePopup={closeContactDetailsPopup}
        />
      )}
    </div>
  );
}

export default HomePage;
