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
// eslint-disable-next-line import/extensions
import MyDatePick from './myDatePicker.js'; // import MyDatePick component

ReactDOM.render(

    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/About" element={<About />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/datepick" element={<MyDatePick />} />
        </Routes>
    </Router>,

    document.getElementById('root'),
);

