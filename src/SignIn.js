import React, { useState } from 'react';
import Navbar from './Navbar.js';
import './SignIn.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

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
        alert(`Email: ${email}\nPassword: ${password}`);
    }

    return (
        <div>
        <header className="header" >
            <Navbar/>
        </header>
        <div className="first_label">
            <div className="left">
                <h1>Sign in</h1>
                <br />
                <form onSubmit={handleSubmit}>
                    <label>
                        Enter your email:
                        <input type="text" name="signup_email" value={email} onChange={handleEmailChange} required />
                    </label>
                    <label>
                        Enter password:
                        <input className="password" type="password" name="signup_password" value={password} onChange={handlePasswordChange} required />
                    </label>
                    <input type="submit" name="signup_submit" value="Sign in" />
                </form>
                <br />
                <br />
                <label>
                    New user? Sign up <a style={{ color: '#1672a0' }} href="Signup.js">here</a>
                </label>
            </div>

            <div className="right">
                <span className="loginwith">Sign in with social network</span>
                <button className="social-signin facebook">Log in with Facebook</button>
                <button className="social-signin twitter">Log in with Twitter</button>
                <button className="social-signin google">Log in with Google+</button>
            </div>

            <div className="or">OR</div>
        </div>
        </div>
    );
}

export default SignIn;
