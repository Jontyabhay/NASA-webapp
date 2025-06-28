import React from 'react';
import APOD from './components/APOD';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
  <Router>
    <div className="App">
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apod" element={<APOD />} />
      </Routes>  
      </main>
    </div>
  </Router>
  );
}

export default App;