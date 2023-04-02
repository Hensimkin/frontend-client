import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
//import reportWebVitals from './reportWebVitals.js';
import './index.css';
import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import About from "./About.js";
import Signup from "./Signup.js";
import SignIn from "./SignIn.js";


ReactDOM.render(

    <Router>
        <Routes>
            <Route path= "/" element={<App/>}/>
            <Route path= "/About" element={<About/>}/>
            <Route path= "/Signup" element={<Signup/>}/>
            <Route path= "/SignIn" element={<SignIn/>}/>
        </Routes>
    </Router>,


    document.getElementById('root')
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
