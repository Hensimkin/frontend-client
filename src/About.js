import React from 'react';
import './About.css';
import Navbar from './Navbar.js';

function About() {
    return (
        <div>

            <header className="header" >
                <Navbar/>
            </header>

            <main>
                <h1 className = "title" style={{ color: 'white' }} >About</h1>
                <p style={{ color: 'white' }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat libero eget magna commodo, quis pharetra tellus pretium.
                    Sed viverra ante in mauris finibus dapibus. Maecenas congue dapibus nulla, eu gravida orci consequat eu.
                    Phasellus nec nunc malesuada, aliquam massa ac, accumsan metus. Fusce sed dignissim lectus. Nunc elit tellus, sollicitudin ac accumsan ut, egestas et dui. Maecenas aliquam est a ligula scelerisque, in aliquam neque sodales. Nullam condimentum euismod dictum.
                    Curabitur non ex elementum, pretium enim ut, ornare ipsum.</p>
            </main>

        </div>
    );
}

export default About;
