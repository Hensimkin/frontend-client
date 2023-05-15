/* eslint-disable */
import React, { useState } from 'react';
import './index.css';
import Navbar from './Navbar.js'; // import the Navbar component
import AddProductPopup from './AddProductPopup.js';
import './HomePage.css';

function HomePage() {
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const openPopup = () => {
    setPopupIsOpen(true);
  };

  const closePopup = () => {
    setPopupIsOpen(false);
  };

  return (
    <div className="App">
      <header className="header">
        <Navbar />
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
          </>
        )}
      </main>
    </div>
  );
}

export default HomePage;
