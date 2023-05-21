/* eslint-disable */
import React, { useState } from 'react';
import './EditProfile.css';
import './ProfilePopup.css';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function EditProfile({ onClose }) {
  const [FullName, setFullName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');


  async function post(e) {
    e.preventDefault();
    try {
      const response_name = await axios.post('http://localhost:5000/edit_name', { FullName })
      const response_phone_number = await axios.post('http://localhost:5000/edit_phone_number', { PhoneNumber })
      onClose();
    }

    catch (error) {
      console.log(error)
    }
  }


  const handleFullName = (event) => {
    const value = event.target.value;
    setFullName(value);
    if (typeof value !== "string" || /\d/.test(value)) {
      setNameError("Please enter a valid input");
    } else {
      setNameError("");
    }
  };


  const handlePhoneNumber = (event) => {
    const value = event.target.value;
    setPhoneNumber(value);
    if (typeof value !== "string" || !/^\d{10}$/.test(value)) {
      setPhoneError("Please enter a valid phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };


  return (
    <div className="popup">
      <div onClick={onClose} className="overlay"></div>
      <div className="popup-inner">
        <span className="close-button" onClick={onClose}>
          x
        </span>
        <h1 className="head">Edit Profile</h1>
        <form onSubmit={post}>
          <br />
          <label className="fonts">
            Full Name:
            <input type="text" pattern="[a-zA-Z\s]*" value={FullName} onChange={handleFullName} />
            {nameError && <span className="error" style={{ color: 'red' }}>{nameError}</span>}
          </label>
          <br />
          <label className="fonts">Phone Number:</label>
          <PhoneInput
            type = "text"
            value={PhoneNumber}
            onChange={setPhoneNumber}
            required
            defaultCountry="IL"
          />
          {/* <label className="fonts">Phone Number: </label> */}
          {/* <input type="text" pattern="[0-9]*" value={PhoneNumber} onChange={handlePhoneNumber} /> */}
          {/* { phoneError&& <span className="error" style={{ color: 'red' }}>{phoneError}</span>} */}
          <br />
          <label className="fonts">Email: </label>
          <label value={email}  />
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