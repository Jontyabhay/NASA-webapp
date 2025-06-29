// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

// NASA API Key
const NASA_API_KEY = process.env.NASA_API_KEY;

// Route to fetch Astronomy Picture of the Day (APOD)
app.get('/apod', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    res.json(response.data); // Send the response to the frontend
  } catch (error) {
    console.error('Error fetching data from NASA API:', error.response.data); // Log the error response
    res.status(500).json({ error: 'Failed to fetch data from NASA API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});