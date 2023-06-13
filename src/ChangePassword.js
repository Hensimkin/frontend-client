/* eslint-disable */
import React, { useState } from 'react';
import './cssFile.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

function ChangePassword({ onClose }) {
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [validNewPassword, setValidNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [validNewPasswordVisible, setValidNewPasswordVisible] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [changeResponse, setChangeResponse] = useState('');


  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
     const response_change =  await axios.post('https://backend-server-qdnc.onrender.com/change_password', {
        validNewPassword,
        newPassword,
        currentPassword,
      });
      setChangeResponse(response_change.data);
      setNewPassword('');
      setCurrentPassword('');
      setValidNewPassword('');
      setErrorMessage('');
      setPasswordChanged(true);
    } catch (error) {
      console.log('Error:', error.response.data);
      setErrorMessage('Failed to change password');
    }
  };


  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!currentPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleValidNewPasswordVisibility = () => {
    setValidNewPasswordVisible(!validNewPasswordVisible);
  };

  return (
    <div className="popup">
      <div onClick={onClose} className="overlay" />
      <div className="popup-inner2">
        <span className="close-button" onClick={onClose}>
          x
        </span>
        <h1 className="head">Change Password</h1>
        <form onSubmit={handleChangePassword}>
          <div className="input-container">
            <input
              className="fontsC"
              type={currentPasswordVisible ? 'text' : 'password'}
              placeholder="Enter Current Password"
              value={currentPassword}
              onFocus={() => setPasswordFocused(true)}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <div className="password-toggle-icon">
              <FontAwesomeIcon
                icon={currentPasswordVisible ? faEyeSlash : faEye}
                onClick={toggleCurrentPasswordVisibility}
              />
            </div>
          </div>
          <br />
          <br />
          <div className="input-container">
            <input
              className="fontsC"
              type={newPasswordVisible ? 'text' : 'password'}
              placeholder="Enter New Password"
              value={newPassword}
              onFocus={() => setPasswordFocused(true)}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <div className="password-toggle-icon">
              <FontAwesomeIcon
                icon={newPasswordVisible ? faEyeSlash : faEye}
                onClick={toggleNewPasswordVisibility}
              />

            </div>
          </div>
          <br />
          <br />
          <div className="input-container">
            <input
              className="fontsC"
              type={validNewPasswordVisible ? 'text' : 'password'}
              placeholder="Enter The New Password Again"
              value={validNewPassword}
              onFocus={() => setPasswordFocused(true)}
              onChange={(e) => setValidNewPassword(e.target.value)}
              required
            />
            <div className="password-toggle-icon">
              <FontAwesomeIcon
                icon={validNewPasswordVisible ? faEyeSlash : faEye}
                onClick={toggleValidNewPasswordVisibility}
              />
            </div>
          </div>
          <br />
          <br />
          <button className="buttonP" type="submit">Change Password</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <p className={`messages_fonts ${changeResponse === 'Password has been changed successfully' ? 'success' : 'error'}`}>
          {changeResponse}
          {' '}
          {(() => {
            if (changeResponse === 'Password has been changed successfully'){
              window.location.href = '/PersonalArea';
            }
          })()}
        </p>
      </div>
    </div>
  );
}

export default ChangePassword;
