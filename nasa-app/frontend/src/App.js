import React from 'react';
import APOD from './components/APOD';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NeoBarGraph from './components/NeoBarGraph';
import MarsCameraUsage from './components/MarsCameraUsage';

function App() {
  return (
  <Router>
    <div className="App">
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<APOD />} />
        <Route path="/mars-photos" element={<MarsCameraUsage />} />
        <Route path="/api/neo-feed" element={<NeoBarGraph />} />
      </Routes>  
      </main>
    </div>
  </Router>
  );
}

export default App;