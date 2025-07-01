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
    const { start_date, end_date } = req.query;
    if (!start_date || !end_date) {
      return res.status(400).json({ error: 'start_date and end_date are required' });
    }
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&start_date=${start_date}&end_date=${end_date}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from NASA API:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch data from NASA API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});