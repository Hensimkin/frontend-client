import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './cssFile.css';
import { Slide } from 'react-slideshow-image';
import UserNavbar from './UserNavbar.js';

function SavedListings() {
  const [savedListingsId, setSavedListingsId] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchSavedListings();
  }, []);

  const fetchSavedListings = async () => {
    try {
      const response = await fetch('http://localhost:5000/returnSavedListing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const savedListingsData = await response.json();
        setSavedListingsId(savedListingsData);
      } else {
        console.error('Failed to fetch saved listings');
      }
    } catch (error) {
      console.error('Error fetching saved listings:', error);
    }
  };

  return (
      <div>
          <header className="header">
              <UserNavbar />
          </header>

          <div className="listings fonts">
              <div className="fonts">
                  <h1>Saved Items</h1>
                  <ul>
                      {savedListingsId.map((listing) => (
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
                                      User:
                                      <Link to={`/User/${listing.userid}`}>
                                          {listing.name}
                                      </Link>
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
                              {/* eslint-disable-next-line max-len */}
                              {/* <Link to={`/User/${listing.userid}`} type="button" className="view_user"> */}
                              {/*     View User */}
                              {/* </Link> */}
                          </li>
                      ))}
                  </ul>
              </div>

          </div>
      </div>
  );
}

export default SavedListings;
