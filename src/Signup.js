import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
// eslint-disable-next-line import/order
import Navbar from './Navbar.js';
import './cssFile.css';
import GoogleFonts from 'google-fonts';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

import 'reactjs-popup/dist/index.css';
import PrivacyPolicy from './PrivacyPolicy.js';

GoogleFonts.add({
  Oswald: 'http://fonts.googleapis.com/css2?family=Oswald&display=swap',
});
function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [emailResponse, setEmailResponse] = useState('');
  const [password, setPassword] = useState('');
  const [passwordResponse, setPasswordResponse] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfBirthResponse, setDateOfBirthResponse] = useState('');
  const [showLastChar, setShowLastChar] = useState(false);
  const [lastChar, setLastChar] = useState('');
  const [isValid, setisValid] = useState('');

  async function post(e) {
    e.preventDefault();
    try {
      // eslint-disable-next-line max-len
      const response_mail = await axios.post('https://backend-server-qdnc.onrender.com/post_email', { email });

      const response_password = await axios.post(
        'https://backend-server-qdnc.onrender.com/post_password',
        { password },
      );

      const response_birthdate = await axios.post(
        'https://backend-server-qdnc.onrender.com/post_birthdate',
        dateOfBirth,
      );

      await axios.post('https://backend-server-qdnc.onrender.com/post_phoneNumber', phoneNumber);

      // eslint-disable-next-line max-len
      const responseFromServer = await axios.post('https://backend-server-qdnc.onrender.com/post_approve', fullName);

      setEmailResponse(response_mail.data);
      setPasswordResponse(response_password.data);
      setDateOfBirthResponse(response_birthdate.data);
      setisValid(false);
      if (responseFromServer.data === 'yes') {
        setisValid(true);
      } else {
        setisValid(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleBirthdateChange(event) {
    setDateOfBirth(event.target.value);
  }
  const handleKeyUp = (event) => {
    const input = event.target;
    const lastCharEntered = input.value.slice(-1); // Get the last character entered

    setShowLastChar(true);
    setLastChar(lastCharEntered);

    // Clear the displayed last character after 1 second
    setTimeout(() => {
      setShowLastChar(false);
      setLastChar('');
    }, 1000);
  };

  const handlePhoneNumber = (value) => {
    setPhoneNumber(value);
    if (!value) {
      setPhoneNumberError('Phone number is required');
    } else if (!isValidPhoneNumber(value)) {
      setPhoneNumberError('Invalid phone number');
    } else {
      setPhoneNumberError('');
    }
  };
  return (
      <>
          <header className="header">
              <Navbar />
          </header>
          <form id="signup-form" onSubmit={post}>
              <div className="mainlabel">
                  <h1 className="head">Sign up</h1>
                  <div className="left">
                      <br />
                      <br />
                      <br />
                      <label className="fonts">Enter full name:</label>
                      <input
                        type="text"
                        name="signup_name"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        required
                      />
                      <label className="fonts">Enter your email:</label>
                      <input
                        type="text"
                        name="signup_email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      {/* eslint-disable-next-line max-len */}
                      <p className={`messages_fonts ${emailResponse === 'Email is available' ? 'success' : 'error'}`}>
                          {emailResponse}
                          {' '}
                      </p>
                      <label className="fonts">Enter password:</label>
                      <div>
                          <input
                            type="password"
                            className="password-input-row"
                            value={password}
                            onChange={handlePasswordChange}
                            onKeyUp={handleKeyUp}
                            required
                          />
                          {showLastChar && <span className="fonts">{lastChar}</span>}
                      </div>
                      {/* eslint-disable-next-line max-len */}
                      <p className={`messages_fonts ${passwordResponse === 'Password received' ? 'success' : 'error'}`}>
                          {passwordResponse}
                          {' '}
                      </p>
                      <br />
                      <br />
                  </div>
                  <div className="right">
                      <br />
                      <br />
                      <br />
                      <label className="fonts">Enter your birthdate:</label>
                      <input
                        className="date"
                        type="date"
                        value={dateOfBirth}
                        onChange={handleBirthdateChange}
                        required
                      />
                      {/* eslint-disable-next-line max-len */}
                      <p className={`messages_fonts ${dateOfBirthResponse === 'Date received' ? 'success' : 'error'}`}>
                          {dateOfBirthResponse}
                      </p>
                      <label className="fonts">Enter phone number:</label>
                      <PhoneInput
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        required
                        defaultCountry="IL"
                        error={phoneNumberError}
                      />
                      {phoneNumberError && (
                      <span className="error" style={{ color: 'red' }}>
                          {phoneNumberError}
                      </span>
                      )}
                      <div>
                          <PrivacyPolicy />
                      </div>
                  </div>
                  <input type="submit" className="signup-button" value="Sign me up" />
                  <div className="alreadySignIn">
                      <label>
                          Already signed up? Sign in
                          {' '}
                          <Link to="/SignIn" style={{ color: '#0b6cb3' }}>Here</Link>
                      </label>
                  </div>
              </div>
          </form>
          {isValid && <Navigate to="/emailValidation" />}
          <div />
      </>
  );
}

export default SignUp;
