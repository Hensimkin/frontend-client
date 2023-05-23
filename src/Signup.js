/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/order
import Navbar from './Navbar.js';
import './signup.css';
import GoogleFonts from 'google-fonts';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import 'reactjs-popup/dist/index.css';
import PrivacyPolicy from './PrivacyPolicy.js';

GoogleFonts.add({
  Oswald: 'https://fonts.googleapis.com/css2?family=Oswald&display=swap',
});
function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [emailResponse, setEmailResponse] = useState('');
  const [password, setPassword] = useState('');
  const [passwordResponse, setPasswordResponse] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfBirthResponse, setDateOfBirthResponse] = useState('');
  const [showLastChar, setShowLastChar] = useState(false);
  const [lastChar, setLastChar] = useState('');

  async function post(e) {
    e.preventDefault();
    try {
      const response_mail = await axios.post('http://localhost:5000/post_email', { email });

      const response_password = await axios.post(
        'http://localhost:5000/post_password',
        { password },
      );

      const response_birthdate = await axios.post(
        'http://localhost:5000/post_birthdate',
        dateOfBirth,
      );

      await axios.post('http://localhost:5000/post_phoneNumber', phoneNumber);

      const responseFromServer = await axios.post('http://localhost:5000/post_approve', fullName);

      setEmailResponse(response_mail.data);
      setPasswordResponse(response_password.data);
      setDateOfBirthResponse(response_birthdate.data);

      if (responseFromServer.data === 'yes') {
        window.location.href = '/emailValidation';
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

  return (
      <>
          <div className="header"><Navbar /></div>
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
                      <p className="messages_fonts">
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
                      <p className="messages_fonts">
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
                      <p className="messages_fonts">{dateOfBirthResponse}</p>
                      <label className="fonts">Enter phone number:</label>
                      <PhoneInput
                        type="text"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        required
                        defaultCountry="IL"
                      />
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
          <div />
      </>
  );
}

export default SignUp;
