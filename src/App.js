import React from 'react';
import './index.css'; // Import the CSS file
//import { Link } from 'react-router-dom'; // Import Link component from React Router DOM

function App() {
    return (
        <div>
            <header>
                <nav>
                    {/*<ul>*/}
                    {/*    /!* Replace the commented Home link with a Link component *!/*/}
                    {/*    <li><Link to="/">Home</Link></li>*/}
                    {/*    <li><Link to="/about">About</Link></li>*/}
                    {/*    <li><Link to="/login">Sign in</Link></li>*/}
                    {/*    <li><Link to="/signup">Sign up</Link></li>*/}
                    {/*</ul>*/}
                </nav>
            </header>
            <main className="main">
                <h1 className="title1" style={{color: "#e9e5e5"}}>Social media</h1>
                <p className="description" style={{color: "#e9e5e5"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat libero eget magna commodo, quis pharetra tellus pretium. Sed viverra ante in mauris finibus dapibus. Maecenas congue dapibus nulla, eu gravida orci consequat eu. Phasellus nec nunc malesuada, aliquam massa ac, accumsan metus. Fusce sed dignissim lectus. Nunc elit tellus, sollicitudin ac accumsan ut, egestas et dui. Maecenas aliquam est a ligula scelerisque, in aliquam neque sodales. Nullam condimentum euismod dictum. Curabitur non ex elementum, pretium enim ut, ornare ipsum.</p>
            </main>
        </div>
    );
}

export default App;
