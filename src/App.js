import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/');
      setBackendData(response.data);
    };
    fetchData();
  }, []);

  return (
      <div className="App">
        <header className="App-header">
            <h1>hello</h1>
          <p>{backendData ? backendData : 'Fetching data...'}</p>
        </header>
      </div>
  );
}

export default App;

