import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [urls, setUrls] = useState('');
  const [results, setResults] = useState(null);

  const handleGetNumbers = async () => {
    try {
      const response = await axios.get(`http://localhost:8008/numbers?url=${urls}`);
      setResults(response.data);
    } catch (error) {
      console.error(error);
      setResults(null);
    }
  };

  return (
    <div>
      <h1>Number Management App</h1>
      <div>
        <input
          type="text"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="Enter URLs separated by commas"
        />
        <button onClick={handleGetNumbers}>Get Numbers</button>
      </div>
      {results && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
