import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-background">
      <h1 style={{ color: '#fff', fontSize: '5rem', marginBottom: '30rem'}}>NASA Space Explorer</h1>
      <button className="home-btn" onClick={() => navigate('/apod')} style={{ marginRight: '30rem', marginTop: '-19rem', padding: '1rem 2rem', marginBottom: '5rem'}}>
        Astronomy Picture of the Day
      </button>
      <button onClick={() => navigate('/mars-photos')} style={{ margin: '1rem', padding: '1rem 2rem', marginBottom: '5rem' }}>
        Mars Rover Photos
      </button>
    </div>
  );
};

export default Home;