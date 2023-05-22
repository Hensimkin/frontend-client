/* eslint-disable */
import React, { useEffect, useState } from 'react'
import './EditProfile.css';
import './ProfilePopup.css';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// eslint-disable-next-line react/prop-types
function EditProfile({ onClose }) {
  const [FullName, setFullName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const email = null;
  const [nameError, setNameError] = useState('');
  const [UserDetails, setUserDetails] = useState([]);

  async function post(e) {
    e.preventDefault();
    try {
      const response_name = await axios.post('http://localhost:5000/edit_name', { FullName });
      const response_phone_number = await axios.post('http://localhost:5000/edit_phone_number', { PhoneNumber });
      console.log(response_name, response_phone_number);
      onClose();
    } catch (error) {
      console.log(error);
    }
  }

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user_details');
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleFullName = (event) => {
    const { value } = event.target;
    setFullName(value);
    if (typeof value !== 'string' || /\d/.test(value)) {
      setNameError('Please enter a valid input');
    } else {
      setNameError('');
    }
  };

  const setElementNameValue = (event) => {
    setFullName(UserDetails.length > 0 ? UserDetails[0].name : '')
  }

  const setElementPhoneValue = (event) => {
    setPhoneNumber(UserDetails.length > 0 ? '+' +  UserDetails[0].phone : '')
  }

  return (
      <div className="popup">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div onClick={onClose} className="overlay" />
          <div className="popup-inner">
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <span className="close-button" onClick={onClose}>
                  x
              </span>
              <h1 className="head">Edit Profile</h1>
              <form onSubmit={post}>
                  <br />
                  <label className="fonts">
                      Full Name:
                      <input type="text" id="output" pattern="[a-zA-Z\s]*" value={FullName} onClick={setElementNameValue} onChange={handleFullName} />
                      {nameError && <span className="error" style={{ color: 'red' }}>{nameError}</span>}
                  </label>
                  <br />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="fonts">Phone Number:</label>
                  <PhoneInput
                    type="text"
                    value={PhoneNumber}
                    onClick={setElementPhoneValue}
                    onChange={setPhoneNumber}
                    required
                    defaultCountry="IL"
                  />
                  <br />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="fonts">Email: </label>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label className="fonts"> {UserDetails.length > 0 ? UserDetails[0].mail : ''} </label>
                  <br />
                  <button type="submit">Save Changes</button>
              </form>
              <br />
              <button type="button" onClick={onClose}>
                  Close
              </button>
          </div>
      </div>
  );
}

export default EditProfile;
