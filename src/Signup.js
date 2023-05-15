import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import './signup.css';
import 'react-datepicker/dist/react-datepicker.css'; // import the DatePicker CSS file
import GoogleFonts from 'google-fonts';

GoogleFonts.add({
  Oswald: 'https://fonts.googleapis.com/css2?family=Oswald&display=swap',
});
//import MyDatePick from './MyDatePicker.js';
function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');

  const handleDateOfBirthChange = (event) => {
    const today = new Date();
    const birthDate = new Date(event.target.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 13) {
      alert("You must be at least 13 years old to register.");
      setDateOfBirth('');
    } else {
      setDateOfBirth(event.target.value);
    }
  };

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

  let handleChange
  return (
      <>
          <div className="header"><Navbar /></div>
          <form id="signup-form" onSubmit={handleSubmit}>

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
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                      <label className="fonts">Enter password:</label>
                      <input
                        type="text"
                        name="signup_password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                      <input  type="submit" name="signup_submit" value="Sign me up" />
                      <br />
                      <br />

                  </div>

                  <div className="right">
                    <br/>
                    <br/>
                    <br/>
                    <label className="fonts">Enter your birthdate:</label>

                    <input className="date" type="date" value={dateOfBirth} onChange={handleDateOfBirthChange} max={new Date().toISOString().split("T")[0]} />

                    <label className="fonts">Enter phone number:</label>
                    <input
                      className="phoneNumber"
                      type="text"
                      name="signup_phoneNumber"
                      value={phoneNumber}
                      onChange={(event) => setphoneNumber(event.target.value)}
                      required
                    />
                    <br/>
                    <br/>
                    <label className="fonts">
                      Already signed up? Sign in
                      {' '}
                      <Link to="/SignIn" style={{ color: '#0b6cb3' }}>Here</Link>
                    </label>

                  </div>
              </div>
          </form>
      </>
  );
}

export default SignUp;
