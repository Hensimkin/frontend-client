import React, { useState } from 'react';
import './cssFile.css';
import axios from 'axios';
import Navbar from './Navbar.js';

function ForgotPass() {
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  async function post(e) {
    e.preventDefault();
    try {
      // eslint-disable-next-line max-len
      const responseFromServer = await axios.post('https://backend-server-qdnc.onrender.com/post_reset', { email });
      setServerResponse(responseFromServer.data);
      // Set the response from the server to the state variable
      if (responseFromServer.data === 'Password reset email sent') {
        window.location.href = '/ResetMessage';
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  // function handlePasswordChange(event) {
  //   setPassword(event.target.value);
  // }

  return (
      <div>
          <header className="header">
              <Navbar />
          </header>
          <h1 className="main_header">Get reset code to your mail</h1>
          <div className="main_forgotPassword">
              <br />
              <br />
              <br />
              <br />
              <div className="center">
                  <form onSubmit={post}>
                      <label className="fonts" htmlFor="emailInput">Enter your email:</label>
                      <input
                        id="emailInput"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      <input
                        type="submit"
                        className="forgotPasword_button"
                        value="Reset my password"
                        onClick={post}
                      />
                  </form>

                  <div>
                      {/* eslint-disable-next-line max-len */}
                      <p className={`messages_fonts ${serverResponse === 'Password reset email sent' ? 'success' : 'error'}`}>
                          {serverResponse}
                      </p>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default ForgotPass;
