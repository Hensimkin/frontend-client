import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/extensions
import App from './App.js';
// import reportWebVitals from './reportWebVitals.js';
import './index.css';
// eslint-disable-next-line import/order
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// eslint-disable-next-line import/extensions
import About from './About.js';
// eslint-disable-next-line import/extensions
import Signup from './Signup.js';
// eslint-disable-next-line import/extensions
import SignIn from './SignIn.js';

ReactDOM.render(

    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/About" element={<About />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/SignIn" element={<SignIn />} />
        </Routes>
    </Router>,

    document.getElementById('root'),
);

// reportWebVitals();
//
//
//
//
//
//
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
