import React, { useState } from 'react';
import './SignIn.css';
import axios from 'axios';
import Navbar from './Navbar.js';
import { Link } from 'react-router-dom'

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
          <h1 className="main_header">Welcome to MarketMate, your go-to online marketplace for all your shopping needs</h1>
          <div className="main_signin">


                  <h1 className="head">Sign in</h1>
                  <br />
                  <div className= "center_fileds">
                    <form onSubmit={post}>
                      <label className="fonts">Enter your email:</label>
                      <input   type="text" value={email} onChange={handleEmailChange} required />
                      <label className="fonts">Enter password:</label>
                      <input className="fonts" type="text" value={password} onChange={handlePasswordChange} required />
                    </form>
                    <div>
                      <p>{emailResponse}</p>
                      <p>{passwordResponse}</p>
                    </div>



                  </div>
            <input type="submit" value="Sign in" style={{ display: 'block', margin: '0 auto',marginBottom:'30px' }} />
            <label className="fonts1" >
              Forgot your password? click
              {' '}
              <Link to="/SignIn" style={{ color: '#0b6cb3' }}>Here</Link>
            </label>

          </div>
      </div>
  );
}

export default SignIn;
