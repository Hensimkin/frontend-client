/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cssFile.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faBookmark, faHeart, faSearch, faSort,faShare } from '@fortawesome/free-solid-svg-icons';
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
  const [sharedListings, setSharedListings] = useState({});


  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isSavedDisabled, setIsSavedDisabled] = useState(false);
  const [isSharedDisabled, setIsSharedDisabled] = useState(false);
  const [userId, setUserId] = useState('');

  const [sortCriteria, setSortCriteria] = useState('');
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);
  const [lastsearches, setLastsearches] = useState([]);
  const [lastsearchesError, setLastsearchesError] = useState('');
  const [selectedSearchTerm, setSelectedSearchTerm] = useState('');

  useEffect(() => {
    const savedLikedState = localStorage.getItem(`${userId}`);
    const savedSavedState = localStorage.getItem(`${userId}1`);
    const savedSharedState = localStorage.getItem(`${userId}12`);

    if (savedLikedState) {
      setLikedListings(JSON.parse(savedLikedState));
    }
    if (savedSavedState) {
      setSavedListings(JSON.parse(savedSavedState));
    }
    if (savedSharedState) {
      setSharedListings(JSON.parse(savedSharedState));
    }
  }, [userId]);

  const fetchUserListings = async () => {
    try {
      const response = await axios.get('https://backend-server-qdnc.onrender.com/home_listings');
      let listings = response.data;

      if (sortCriteria === 'category') {
        listings = listings.sort((a, b) => a.category.localeCompare(b.category));
        filteredUserListings = filteredUserListings.sort((a, b) => a.category.localeCompare(b.category));
      } else if (sortCriteria === 'price') {
        listings = listings.sort((a, b) => a.price - b.price);
        filteredUserListings = filteredUserListings.sort((a, b) => a.price - b.price);
      }

      setUserListings(listings);
      const user = await axios.post('https://backend-server-qdnc.onrender.com/get_uid');
      setUserId(user.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserListings();
  }, [sortCriteria]); // Add filteredUserListings as a dependency


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

  const handleLastSearchClick = (search) => {
    setSearchTerm(search);
    setIsSearchTriggered(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setIsSearchTriggered(true);
    }
  };
  // const handleSearchButtonClick = () => {
  //   setIsSearchTriggered(true);
  //   setSelectedSearchTerm(searchTerm);
  // };
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
  const sharedListing = async (listing) => {
    const listingId = listing.id;
    const isListingShared = sharedListings[listingId] || false;
    setIsSharedDisabled(true); // Disable the button

    try {
      const updatedSharedListings = {
        ...sharedListings,
        [listingId]: !isListingShared,
      };
      setSharedListings(updatedSharedListings);
      localStorage.setItem(`${userId}12`, JSON.stringify(updatedSharedListings));
      const deleteOrSave = isListingShared ? 'delete' : 'save';
      await axios.post('https://backend-server-qdnc.onrender.com/shareListing', { listingId, deleteOrSave });
    } catch (error) {
      console.error('Error saving listing:', error);
    }
    setIsSharedDisabled(false); // Enable the button
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
      if (searchTerm !== '') {
        const response = await axios.get('https://backend-server-qdnc.onrender.com/search_listings', {
          params: { search: searchTerm },
        });
        console.log(response.data); // Check the value of response.data
        let filteredListings = response.data;

        if (sortCriteria === 'category') {
          filteredListings = filteredListings.sort((a, b) => a.category.localeCompare(b.category));
        } else if (sortCriteria === 'price') {
          filteredListings = filteredListings.sort((a, b) => a.price - b.price);
        }

        setFilteredUserListings(filteredListings);
      }
    } catch (error) {
      console.error('Error searching listings:', error);
    }
  };

  useEffect(() => {
    if (isSearchTriggered) {
      handleSearch();
      setIsSearchTriggered(false);
    }
  }, [isSearchTriggered]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredUserListings([]);
    }
  }, [searchTerm]);


  useEffect(() => {
    fetchLastSearches();
  }, []);
  const fetchLastSearches = async () => {
    try {
      const response = await axios.get('https://backend-server-qdnc.onrender.com/lastsearches');
      setLastsearches(response.data);
    } catch (error) {
      console.log(error);
      setLastsearchesError('There is no last searches.');
    }
  };



  return (
    <div className="">
      <header className="header">
        <UserNavbar />
      </header>
      <div className="search">
        <input
          type="text"
          placeholder="Search User/Title"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
        <div >
          <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)}>
            <option value="">Sort by: <FontAwesomeIcon icon={faSort}  /></option>
            <option value="category">Category</option>
            <option value="price">Price</option>
          </select>
        </div>

        {lastsearchesError && <p>{lastsearchesError}</p>}
        {lastsearches.length > 0 && (
          <div className="fonts">
            Recently searched :
            {lastsearches.map((search, index) => (
              <span
                key={index}
                onClick={() => handleLastSearchClick(search)}
                style={{ cursor: "pointer", marginLeft: "5px", color: "#007bff", textDecoration: "underline"}}
              >
          {search}
        </span>
            ))}
          </div>
        )}

      </div>

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

      <div className="listings fonts">
        <h2>Your Listings</h2>
        <ul className={`list ${isGridView ? 'grid-view' : ''}`} >
          {filteredUserListings.length > 0
            ? filteredUserListings.map((listing) => {
              const isListingLiked = likedListings[listing.id] || false;
              const isListingSaved = savedListings[listing.id] || false;
              const isListingShared = sharedListings[listing.id] || false;

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
                  <div className={`slide-container ${addProductPopupIsOpen ? 'hide-arrows' : ''}`}>
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
                    <button
                      type="button"
                      onClick={() => sharedListing(listing)}
                      disabled={isSharedDisabled}
                      className={`buttonH ${isListingShared ? 'liked' : ''}`}
                    >
                      {isListingShared ? (
                        <FontAwesomeIcon icon={faShare} style={{ color: '#8bf64c' }} />
                      ) : (
                        <FontAwesomeIcon icon={faShare} style={{ color: 'white' }} />
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
            const isListingShared = sharedListings[listing.id] || false;

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
                <div className={`slide-container ${addProductPopupIsOpen ? 'hide-arrows' : ''}`}>
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
                  <button
                    type="button"
                    onClick={() => sharedListing(listing)}
                    disabled={isSharedDisabled}
                    className="buttonH"
                  >
                    {isListingShared ? (
                      <FontAwesomeIcon icon={faShare} style={{ color: '#8bf64c' }} />
                    ) : (
                      <FontAwesomeIcon icon={faShare} style={{ color: 'white' }} />
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
