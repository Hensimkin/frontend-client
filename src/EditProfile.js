/* eslint-disable */
import React, { useState } from 'react';
import './EditProfile.css';


function EditProfile({ onClose }) {
  const [FullName, setFullName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

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
      <div className="popup-inner">
        <h1 className="head">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <br></br>
            <label className="fonts">Full Name: </label>
            <input type="text" value={FullName} onChange={handleFullName} />
          <br></br>
            <label className="fonts">Phone Number: </label>
            <input type="text" value={PhoneNumber} onChange={handlePhoneNumber} />
          <br></br>
            <label className="fonts">Email: </label>
            <input type="text" value={email} onChange={handleEmailChange} />
          <br></br>
            <label className="fonts">Bio: </label>
            <textarea
              value={bio}
              onChange={handleBioChange}
            />
          <br></br>
          <input type="submit" className="save_button" value="Save Changes" style={{textAlign:'center'}} />
        </form>
        <br></br>
        <input onClick={onClose} className="save_button" value="Close" style={{textAlign:'center'}} />
      </div>
    </div>
  );
}

export default EditProfile;
