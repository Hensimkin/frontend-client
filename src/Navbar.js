import React from 'react';
// import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="/About.js">About</a></li>
                <li><a href="#">Login</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
