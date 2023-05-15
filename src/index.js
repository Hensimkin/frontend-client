import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup.js';
import SignIn from './SignIn.js';
import HomePage from './HomePage.js'

ReactDOM.render(

    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/HomePage" element={<HomePage />} />
            {/* <Route path="/datepick" element={<MyDatePick />} /> */}
        </Routes>
    </Router>,

    document.getElementById('root'),
);

