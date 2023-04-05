import React, { useState } from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar.js';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverResponse, setServerResponse] = useState('');


  async function post(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/post_email', { email });
      console.log(response.data); // Log the response received from the server
      const response2 = await axios.post('http://localhost:5000/post_password', { password });
      console.log(response2.data); // Log the response received from the server
      setServerResponse(response.data); // Set the response from the server to the state variable
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
    alert(`Email: ${email}\nPassword: ${password}`);
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
            <input type={'text'} value={email} onChange={handleEmailChange} required />
            Enter password:
            <input className="password" type="password" value={password} onChange={handlePasswordChange} required />
            <button type="submit">Sign in</button>
          </form>
          <div>
            <p>{serverResponse}</p>
          </div>
          <br />
          <br />
          <label htmlFor="signup">
            New user? Sign up
            <Link to="/Signup">Here</Link>
          </label>
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
