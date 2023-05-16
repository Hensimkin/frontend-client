/* eslint-disable */
import React, { useState } from 'react';
import './EditProfile.css';


function EditProfile({ onClose }) {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <br></br>
          <label>
            First Name:
            <input type="text" value={FirstName} onChange={handleFirstName} />
          </label>
          <br></br>
          <label>
            Last Name:
            <input type="text" value={LastName} onChange={handleLastName} />
          </label>
          <br></br>
          <label>
            Email:
            <input type="text" value={email} onChange={handleEmailChange} />
          </label>
          <br></br>
          <label>
            Bio:
            <textarea
              value={bio}
              onChange={handleBioChange}
            />
          </label>
          <br></br>
          <button type="submit">Save Changes</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default EditProfile;
