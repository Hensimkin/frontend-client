import React, { useState } from 'react';
import './login.css';

function SignIn() {
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
        // Replace "index.html" with your desired URL
        window.location.href = "index.html";
    }

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="signup.html">Sign up</a></li>
                    </ul>
                </nav>
            </header>

            <form onSubmit={handleSubmit} id="signup-form">
                <div className="first_label">
                    <div className="left">
                        <h1>Sign in</h1>
                        <br />
                        <label>Enter your email:</label>
                        <input
                            type="text"
                            name="signup_email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                        <label>Enter password:</label>
                        <input
                            className="password"
                            type="password"
                            name="signup_password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <input type="submit" name="signup_submit" value="Sign in" />
                        <br />
                        <br />
                        <label>
                            New user? Sign up{" "}
                            <a style={{ color: "#1672a0" }} href="signup.html">
                                here
                            </a>
                        </label>
                    </div>

                    <div className="right">
                        <span className="loginwith">Sign in with social network</span>
                        <button className="social-signin facebook">Log in with facebook</button>
                        <button className="social-signin twitter">Log in with Twitter</button>
                        <button className="social-signin google">Log in with Google+</button>
                    </div>
                    <div className="or">OR</div>
                </div>
            </form>
        </>
    );
}

export default SignIn;


