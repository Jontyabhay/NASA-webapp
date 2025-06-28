import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>NASA Space Explorer</h1>
      <button onClick={() => navigate('/apod')} style={{ margin: '1rem', padding: '1rem 2rem' }}>
        Astronomy Picture of the Day
      </button>
      <button onClick={() => navigate('/mars-photos')} style={{ margin: '1rem', padding: '1rem 2rem' }}>
        Mars Rover Photos
      </button>
    </div>
  );
};

export default Home;