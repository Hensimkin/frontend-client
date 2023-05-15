import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup.js';
import SignIn from './SignIn.js';

ReactDOM.render(

    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/SignIn" element={<SignIn />} />
            {/* <Route path="/datepick" element={<MyDatePick />} /> */}
        </Routes>
    </Router>,

    document.getElementById('root'),
);

