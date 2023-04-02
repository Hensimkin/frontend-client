import React from 'react';
// import './index.css';
import Navbar from './Navbar.js';


function App() {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main className="main">
                <h1 className="title1" style={{color: "#e9e5e5"}}>Social media</h1>
                <p className="description" style={{color: "#e9e5e5"}}>My App</p>
            </main>
        </div>
    );
}

export default App;

