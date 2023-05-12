import React, { useState } from 'react';
import './SignIn.css';
import axios from 'axios';
// eslint-disable-next-line import/extensions
import Navbar from './Navbar.js';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailResponse, setEmailResponse] = useState('');
  const [passwordResponse, setPasswordResponse] = useState('');

  async function post(e) {
    e.preventDefault();
    try {
      const response_mail = await axios.post('http://localhost:5000/post_email', { email });
      console.log(response_mail.data); // Log the response received from the server
      const response_password = await axios.post('http://localhost:5000/post_password', { password });
      console.log(response_password.data); // Log the response received from the server
      setEmailResponse(response_mail.data); // Set the response from the server to the state variable
      setPasswordResponse(response_password.data); // Set the response from the server to the state variable
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
          <div className="first_label">
              <div className="left">
                  <h1>Sign in</h1>
                  <br />
                  <form onSubmit={post}>
                      Enter your email:
                      <input type="text" value={email} onChange={handleEmailChange} required />
                      Enter password:
                      <input className="password" type="password" value={password} onChange={handlePasswordChange} required />
                      {/* <button type="submit">Sign in</button> */}
                      <input type="submit" value="Sign in" />
                  </form>
                  <div>
                      <p>{emailResponse}</p>
                      <p>{passwordResponse}</p>
                  </div>

              </div>

              <div className="right">
                  <span className="loginwith">Sign in with social network</span>
                  <button type="button" className="social-signin facebook">
                      Log in with Facebook
                  </button>
                  <button type="button" className="social-signin twitter">
                      Log in with Twitter
                  </button>
                  <button type="button" className="social-signin google">
                      Log in with Google+
                  </button>
              </div>

              <div className="or">OR</div>
          </div>
      </div>
  );
}

export default SignIn;
