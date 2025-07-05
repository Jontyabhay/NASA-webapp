// backend/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5050;
const path = require('path');

app.use(cors());
app.use(express.json());

// NASA API Key
const NASA_API_KEY = process.env.NASA_API_KEY;

//Route to fetch Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/components/Home.js'));
});

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

// Route to fetch Mars Rover Photos
app.get('/mars-photos', async (req, res) => {
  try {
    const { sol } = req.query;
    if (!sol) {
      return res.status(400).json({ error: 'sol is required' });
    }
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=${NASA_API_KEY}`;
    const response = await axios.get(url);
    const photos = response.data.photos;

    // Count photos per camera
    const cameraUsage = {};
    photos.forEach(photo => {
      const cam = photo.camera.name;
      cameraUsage[cam] = (cameraUsage[cam] || 0) + 1;
    });

    res.json(cameraUsage);
  } catch (error) {
    console.error('Error fetching camera usage:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch camera usage' });
  }
});

// Route to fetch EPIC image counts per day
app.get('/api/neo-feed', async (req, res) => {
  const { start_date, end_date } = req.query;
  if (!start_date || !end_date) {
    return res.status(400).json({ error: 'start_date and end_date are required' });
  }
  try {
    const nasaUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API_KEY}`;
    const response = await axios.get(nasaUrl);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from NASA API' });
  }
});
//export the app
module.exports = app;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 

