/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SavedListings.css';
import UserNavbar from './UserNavbar.js';


function SavedListings() {
  const [savedListings, setSavedListings] = useState([]);

  useEffect(() => {
    fetchSavedListings();
  }, []);

  const fetchSavedListings = async () => {
    try {
      const response = await fetch('http://localhost:5000/saved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const savedListingsData = await response.json();
        setSavedListings(savedListingsData);
      } else {
        console.error('Failed to fetch saved listings');
      }
    } catch (error) {
      console.error('Error fetching saved listings:', error);
    }
  };

  return (
    <div className="saved-listings-container">
      <header className="header">
        <UserNavbar />
      </header>
      <h1>Saved Items</h1>
      <ul>
        {savedListings.map((listing) => (
          <li key={listing.userid}>
            <p>Title: {listing.title}</p>
            <p>Price: {listing.price}</p>
            <p>Category: {listing.category}</p>
            <p>Description: {listing.description}</p>
            <Link to={`/User/${listing.userid}`}>View User</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SavedListings;