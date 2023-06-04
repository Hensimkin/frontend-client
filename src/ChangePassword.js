/* eslint-disable */
import React, { useState } from 'react';
import './ProfilePopup.css';
import axios from 'axios';

function ChangePassword({ onClose }) {
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/change_password', {
        newPassword,
        currentPassword,
      });
      console.log('Password has changed successfully');
      setNewPassword(''); // Clear the input fields
      setCurrentPassword(''); // Clear the input fields
      setErrorMessage(''); // Clear any previous error message
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
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit">Change Password</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default ChangePassword;
