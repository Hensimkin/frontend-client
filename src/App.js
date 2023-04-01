import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [backendData, setBackendData] = useState(null);

    useEffect(() => {
        axios.get('/api/data').then(response => {
            setBackendData(response.data);
        });
    }, []);

    return (
        <div>
            <h1>My App</h1>
            <p>{backendData ? backendData : 'Fetching data...'}</p>
        </div>
    );
}

export default App;