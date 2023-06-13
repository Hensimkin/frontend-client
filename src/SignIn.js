import React, { useState } from 'react';
import './cssFile.css';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import Navbar from './Navbar.js';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let credentials = {
    email: '',
    password: '',
  };

  async function post(e) {
    e.preventDefault();
    try {
      credentials = {
        email,
        password,
      };
      setIsAuthenticated(false);
      // eslint-disable-next-line max-len
      const responseFromServer = await axios.post('https://backend-server-qdnc.onrender.com/post_signin', { credentials });
      setServerResponse(responseFromServer.data);
      if (responseFromServer.data === 'Welcome !') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
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

  return (
      <div>
          <header className="header">
              <Navbar />
          </header>
          {/* eslint-disable-next-line max-len */}
          <h1 className="main_header">Welcome to MarketMate, your go-to online marketplace for all your shopping needs</h1>
          <div className="main_signin">
              <h1 className="head">Sign in</h1>
              <br />
              <div className="center_fileds">
                  <form onSubmit={post}>
                      <label className="fonts">Enter your email:</label>
                      <input type="text" value={email} onChange={handleEmailChange} required />
                      <label className="fonts">Enter password:</label>
                      {/* eslint-disable-next-line max-len */}
                      <input className="passtype" type="password" value={password} onChange={handlePasswordChange} required />
                      {/* eslint-disable-next-line max-len */}
                      <input type="submit" className="signin_button" value="Sign in" onClick={post} />
                  </form>
                  <div>
                      {/* eslint-disable-next-line max-len */}
                      <p className={`messages_fonts ${serverResponse === 'Welcome !' ? 'success' : 'error'}`}>
                          {serverResponse}
                      </p>
                  </div>
              </div>
              <label className="fonts1">
                  Forgot your password? click
                  {' '}
                  <Link to="/ForgotPassword" style={{ color: '#0b6cb3' }}>Here</Link>
              </label>

          </div>
          {isAuthenticated && <Navigate to="/HomePage" />}

      </div>
  );
}

export default SignIn;
