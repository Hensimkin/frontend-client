import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import './signup.css';
import 'react-datepicker/dist/react-datepicker.css'; // import the DatePicker CSS file
import GoogleFonts from 'google-fonts';
import axios, { post } from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import moment from 'moment'
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
  const [phoneNumberResponse, setPhoneNumberResponse] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfBirthResponse, setDateOfBirthResponse] = useState('');

  const [value, setValue] = useState()
  async function post(e) {
    e.preventDefault();
    try {
      const response_mail = await axios.post('http://localhost:5000/post_email', { email });

      const response_password = await axios.post('http://localhost:5000/post_password', { password });

       const response_phoneNumber = await axios.post('http://localhost:5000/post_phoneNumber',{phoneNumber})

      const response_birthdate = await axios.post('http://localhost:5000/post_birthdate', dateOfBirth);


      setEmailResponse(response_mail.data);
      setPasswordResponse(response_password.data);
      setPhoneNumberResponse(response_phoneNumber.data)
      setDateOfBirthResponse(response_birthdate.data)

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
                  <p className="messages_fonts">{emailResponse}  </p>


                  <label  className="fonts">Enter password:</label>
                      <input
                        type="text"
                        name="signup_password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                      />
                  <p className="messages_fonts">{passwordResponse}  </p>

                      <br />
                      <br />

                  </div>

                  <div className="right">
                    <br/>
                    <br/>
                    <br/>
                    <label className="fonts">Enter your birthdate:</label>

                    <input className="date" type="date" value={dateOfBirth} onChange={handleBirthdateChange}  required/>
                    <p className="messages_fonts">{dateOfBirthResponse}</p>

                    <label className="fonts">Enter phone number:</label>
                    <PhoneInput
                      type = "text"
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      required
                    />
                  </div>
               <p>{phoneNumberResponse}</p>

              <br/>

                    <label className="fonts">
                      Already signed up? Sign in
                      {' '}
                      <Link to="/SignIn" style={{ color: '#0b6cb3' }}>Here</Link>
                    </label>

              <input type="submit" className="signup-button" value="Sign me up" />
            </div>
          </form>
          <div>

        </div>
      </>
  );
}

export default SignUp;
