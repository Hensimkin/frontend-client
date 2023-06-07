/* eslint-disable */

import React, { useEffect, useState } from 'react';
import './EditProfile.css';
import './ProfilePopup.css';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function EditProfile({ onClose }) {
  const [FullName, setFullName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [nameError, setNameError] = useState('');
  const [UserDetails, setUserDetails] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  async function post(e) {
    e.preventDefault();
    try {
      const response_name = await axios.post(
        'http://localhost:5000/edit_name',
        { FullName },
      );
      const response_phone_number = await axios.post(
        'http://localhost:5000/edit_phone_number',
        { PhoneNumber: PhoneNumber.slice(1) },
      );
      const message = `${response_name.data}\n${response_phone_number.data}`;
      alert(message); // Display the server response in an alert window
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

  useEffect(() => {
    if (UserDetails.length > 0) {
      setFullName(UserDetails[0].name);
      setPhoneNumber(`+${UserDetails[0].phone}`);
    }
  }, [UserDetails]);

  const handleFullName = (event) => {
    const { value } = event.target;
    setFullName(value);
    if (typeof value !== 'string' || /\d/.test(value)) {
      setNameError('Please enter a valid input');
    } else {
      setNameError('');
    }
  };

  return (
      <div className="popup">
          <div onClick={onClose} className="overlay" />
          <div className="popup-inner">
              <span className="close-button" onClick={onClose}>
                  x
              </span>
              <h1 className="head">Edit Profile</h1>
              <form onSubmit={post}>
                  <br />
                  <label className="fonts">
                      Full Name:
                      <input
                        type="text"
                        id="output"
                        pattern="[a-zA-Z\s]*"
                        value={FullName}
                        onChange={handleFullName}
                        required
                      />
                      {nameError && (
                      <span className="error" style={{ color: 'red' }}>
                          {nameError}
                      </span>
                      )}
                  </label>
                  <br />
                  <label className="fonts">Phone Number:</label>
                  <PhoneInput
                    type="text"
                    value={PhoneNumber}
                    onChange={setPhoneNumber}
                    required
                    defaultCountry="IL"
                  />
                  <br />
                  <label className="fonts">Email: </label>
                  <label className="fonts">
                      {UserDetails.length > 0 ? UserDetails[0].mail : ''}
                  </label>
                  <br />
                  <button type="submit">Save Changes</button>
              </form>
              {responseMessage && (
              <div className="response-message">{responseMessage}</div>
              )}
              <br />
              <button type="button" onClick={onClose}>
                  Close
              </button>
          </div>
      </div>
  );
}

export default EditProfile;
