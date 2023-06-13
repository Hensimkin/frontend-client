import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './cssFile.css';
// eslint-disable-next-line import/order
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup.js';
import SignIn from './SignIn.js';
import HomePage from './HomePage.js';
import PersonalArea from './PersonalArea.js';
import ValidMAil from './emailValidation.js';
import ForgotPass from './ForgotPassword.js';
import ResetMess from './ResetMessage.js';
import User from './User.js';
import Saved from './Saved.js';
import Liked from './Liked.js';

ReactDOM.render(

    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/PersonalArea" element={<PersonalArea />} />
            <Route path="/emailValidation" element={<ValidMAil />} />
            <Route path="/ForgotPassword" element={<ForgotPass />} />
            <Route path="/ResetMessage" element={<ResetMess />} />
            <Route path="/User/:uid" element={<User />} />
            <Route path="/Saved" element={<Saved />} />
            <Route path="/Liked" element={<Liked />} />

        </Routes>
    </Router>,

    document.getElementById('root'),
);
