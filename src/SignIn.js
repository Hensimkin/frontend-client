import React, { useState } from 'react';
import './SignIn.css';
import axios from 'axios';
import Navbar from './Navbar.js';
import { Link } from 'react-router-dom'

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  let credentials = {
    email: '',
    password: ''
  };


  async function post(e) {
    e.preventDefault();
    try {
      credentials = {
        email: email,
        password: password
      };
      const responseFromServer = await axios.post('http://localhost:5000/post_signin', { credentials });
      setServerResponse(responseFromServer.data); // Set the response from the server to the state variable
      if (responseFromServer.data === 'Welcome !') {
        window.location.href = '/homepage';
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
          <h1 className="main_header">Welcome to MarketMate, your go-to online marketplace for all your shopping needs</h1>
          <div className="main_signin">


                  <h1 className="head">Sign in</h1>
                  <br />
                  <div className= "center_fileds">
                    <form onSubmit={post}>
                      <label className="fonts">Enter your email:</label>
                      <input   type="text" value={email} onChange={handleEmailChange} required />
                      <label className="fonts">Enter password:</label>
                      <input className="passtype" type="password" value={password} onChange={handlePasswordChange} required />
                      <input type="submit" className="signin_button" value="Sign in" onClick={post} />

                    </form>
                    <div>
                      <p className="messages_fonts">
                          {serverResponse}


                      </p>

                    </div>



                  </div>


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
