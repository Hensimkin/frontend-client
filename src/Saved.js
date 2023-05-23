/* eslint-disable */
import React from 'react';
import './SavedListings.css';
import UserNavbar from './UserNavbar.js';

function SavedListings() {
  return (
    <div className="saved-listings-container">
      <header className="header">
        <UserNavbar />
      </header>
      <h1>Saved Items</h1>
    </div>
  );
}

export default SavedListings;