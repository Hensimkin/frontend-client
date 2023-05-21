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
  const [storedData, setStoredData] = useState({});

  const openPopup = () => {
    setPopupIsOpen(true);
  };

  const closePopup = () => {
    setPopupIsOpen(false);
  };

  const fetchStoredData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_stored_data');
      setStoredData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchStoredData();
  }, []);



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
            <h1 className="title1">Social media</h1>
            <p className="description" style={{ color: 'white' }}>
              Join the NetConnect community today and start sharing your world
              with others!
            </p>
            <p>Title: {storedData.title}</p>
            <p>Description: {storedData.description}</p>
            <p>Category: {storedData.category}</p>
            <p>Price: {storedData.price}</p>
          </>
        )}
      </main>
    </div>
  );
}

export default HomePage;
