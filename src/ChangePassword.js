/* eslint-disable */
import React, { useState } from 'react';
import './ProfilePopup.css';
import axios from 'axios';

function ChangePassword({ onClose }) {
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [ValidNewPassword, setValidNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);


  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/change_password', {
        newPassword,
        currentPassword,
        ValidNewPassword,
      });
      console.log('Password has changed successfully');
      setNewPassword(''); // Clear the input fields
      setCurrentPassword(''); // Clear the input fields
      setValidNewPassword(''); // Clear the input fields
      setErrorMessage(''); // Clear any previous error message
      setPasswordChanged(true); // Set the passwordChanged state to true
    } catch (error) {
      console.log('Error:', error.response.data);
      setErrorMessage('Failed to change password');
    }
  };


  return (
    <div className="modal">
      <div onClick={onClose} className="overlay" />
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          x
        </span>
        <h1 className="head">Change Password</h1>
        <form onSubmit={handleChangePassword}>
          <input
            type="password"
            placeholder="Enter Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder=" Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter again New Password"
            value={ValidNewPassword}
            onChange={(e) => setValidNewPassword(e.target.value)}
          />
          <button type="submit">Change Password</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        {passwordChanged && <p>Password has changed successfully!</p>}
      </div>
    </div>
  );
}

export default ChangePassword;
