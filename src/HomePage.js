/* eslint-disable */
import React, { useEffect, useState } from 'react'
import './index.css';
import Navbar from './Navbar.js'; // import the Navbar component
import AddProductPopup from './AddProductPopup.js';
import axios from 'axios';
import './HomePage.css';
import UserNavbar from './UserNavbar.js'

function HomePage() {
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [userListings, setUserListings] = useState([]);
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
  const openPopup = () => {
    setPopupIsOpen(true);
  };

  const closePopup = () => {
    setPopupIsOpen(false);
  };


  return (
    <div className="App">
      <header className="header">
        <UserNavbar />
      </header>
      <main className="main">
        {!popupIsOpen && (
          <button type="button"  onClick={openPopup}>
            Add Product
          </button>
        )}
        {popupIsOpen && <AddProductPopup closePopup={closePopup} />}
        {!popupIsOpen && (
          <>


          </>
        )}
      </main>
      <div className="listings">
        <div className="fonts">
          <h3>Your Listings</h3>
          <ul >
            {userListings.map((listing) => (
              <li key={listing.id}>
                <p>Title: {listing.title}</p>
                <p>Price: {listing.price}</p>
                <p>Category: {listing.category}</p>
                <p>Description: {listing.description}</p>
                {/* Render additional listing details as needed */}
              </li>
            ))}
          </ul>

        </div>

      </div>

    </div>
  );
}

export default HomePage;
