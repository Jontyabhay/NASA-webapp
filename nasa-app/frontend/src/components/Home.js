import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from './images/NASA.jpg';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-background">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
        <h1 style={{ color: '#fff', fontSize: '5rem', marginBottom: '30rem', marginRight: '2rem'}}>NASA Space Explorer</h1>
        <img src={logo} alt="NASA Logo" style={{ marginTop: '-25rem', width: '80px', height: '80px', objectFit: 'contain'}}/>
      </div>
      <button className="home-btn" onClick={() => navigate('/apod')} style={{ marginRight: '70rem', marginTop: '-23rem', padding: '1rem 2rem', marginBottom: '5rem'}}>
        Astronomy Picture of the Day
      </button>
      <button className="home-btn" onClick={() => navigate('/mars-photos')} style={{ marginRight: '70rem', padding: '1rem 2rem', marginBottom: '5rem' }}>
        Mars Rover Photos
      </button>
      <button className="home-btn" onClick={() => navigate('/mars-photos')} style={{ marginRight: '70rem', padding: '1rem 2rem', marginBottom: '5rem' }}>
        Earth Polychromatic Imaging Camera
      </button>
      <button className="home-btn" onClick={() => navigate('/mars-photos')} style={{ marginRight: '70rem', padding: '1rem 2rem', marginBottom: '5rem' }}>
        Near earth Object Web Service
      </button>
      <button className="home-btn" onClick={() => navigate('/mars-photos')} style={{ marginRight: '70rem', padding: '1rem 2rem', marginBottom: '3rem' }}>
        NASA Image and Video Library
      </button>
      <div className="intro">
        <p>"Delve into the wonders of the Universe with Astronomy Picture of the day, Mars Rover Photos and more. Click any button to start your cosmic journey."</p>
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Bounce Insights | Made with ❤️ by Akshay Mishra
      </footer>
    </div>
  );
};

export default Home;