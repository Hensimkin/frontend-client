import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import Navbar from './Navbar.js';
import './signup.css';
// eslint-disable-next-line import/extensions
import MyDatePick from './myDatePicker.js';
function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    // Check email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Check password
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    // If email and password are valid, submit the form
    console.log('Form submitted:', { fullName, email, password });
  }

  return (
      <>
          <div className="header"><Navbar /></div>
          <form id="signup-form" onSubmit={handleSubmit}>
              <div className="first_label">
                  <div className="left">
                      <h1>Sign up</h1>
                      <br />
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label>Enter full name:</label>
                      <input
                        type="text"
                        name="signup_name"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        required
                      />

                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label>Enter your email:</label>
                      <input
                        type="text"
                        name="signup_email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label>Enter password:</label>
                      <input
                        className="password"
                        type="password"
                        name="signup_password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                      <input type="submit" name="signup_submit" value="Sign me up" />
                      <br />
                      <br />
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label>
                          Already signed up? Sign in
                          {' '}
                          <Link to="/SignIn">Here</Link>
                      </label>
                  </div>

                  <div className="right">
                      <span className="loginwith">
                          Sign in with
                          <br />
                          social network
                      </span>
                      <div className="hi">< MyDatePick /></div>

                      <button type="button" className="social-signin twitter">
                          Log in with Twitter
                      </button>
                      <button type="button" className="social-signin google">
                          Log in with Google+
                      </button>
                  </div>
                  <div className="or">OR</div>
              </div>
          </form>
      </>
  );
}

export default SignUp;
