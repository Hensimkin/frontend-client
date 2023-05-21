/* eslint-disable */
import React, { useState } from 'react';
import './EditProfile.css';
import './ProfilePopup.css';
import axios from 'axios';

function EditProfile({ onClose }) {
  const [FullName, setFullName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');


  async function post(e) {
    e.preventDefault();
    try {
      const response_name = await axios.post('http://localhost:5000/edit_name', { FullName })
      onClose();
    }

    catch (error) {
      console.log(error)
    }
  }

  const handleFullName = (event) => {
    setFullName(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
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
          <label className="fonts">Full Name: </label>
          <input type="text" value={FullName} onChange={handleFullName} />
          <br />
          <label className="fonts">Phone Number: </label>
          <input type="text" value={PhoneNumber} onChange={handlePhoneNumber} />
          <br />
          <label className="fonts">Email: </label>
          <input type="text" value={email} onChange={handleEmailChange} />
          <br />
          <label className="fonts">Bio: </label>
          <textarea value={bio} onChange={handleBioChange} />
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