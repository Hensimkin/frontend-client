import React from 'react';
import './index.css';
// import {Route, Routes} from "react-router-dom";
// import  {Link} from "react-router-dom";
// eslint-disable-next-line import/extensions
import Navbar from './Navbar.js'; // import the Navbar component

function App() {
  return (
      <div className="App">

          <header className="header">
              <Navbar />
          </header>
          <main className="main">
              <h1 className="title1">Social media</h1>
              <p className="description" style={{ color: 'white' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat.
              </p>
          </main>

      </div>
  );
}

export default App;
