import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

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

function App() {
    return (
        <div>
            <header className="header">
                <Navbar />
            </header>
            <main className="main">
                <h1 className="title1">Social media</h1>
                <p className="description" style={{ color: 'white' }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat libero eget magna commodo, quis pharetra tellus pretium. Sed viverra ante in mauris finibus dapibus. Maecenas congue dapibus nulla, eu gravida orci consequat eu. Phasellus nec nunc malesuada, aliquam massa ac, accumsan metus. Fusce sed dignissim lectus. Nunc elit tellus, sollicitudin ac accumsan ut, egestas et dui. Maecenas aliquam est a ligula scelerisque, in aliquam neque sodales. Nullam condimentum euismod dictum. Curabitur non ex elementum, pretium enim ut, ornare ipsum.</p>
            </main>



        </div>
    );
}

export default App;
