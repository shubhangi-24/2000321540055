const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

app.use(express.json());

function isURLValid(url) {
  
  return url.startsWith('http://') || url.startsWith('https://');
}

async function fetchURLData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from URL: ${url}. Error: ${error.message}`);
    return null;
  }
}

app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No URLs provided' });
  }

  const urls = Array.isArray(url) ? url : [url];
  const validURLs = urls.filter((url) => isURLValid(url));

  if (validURLs.length === 0) {
    return res.status(400).json({ error: 'No valid URLs provided' });
  }

  const results = {};
  for (const url of validURLs) {
    const data = await fetchURLData(url);
    if (data) {
      results[url] = data;
    }
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
