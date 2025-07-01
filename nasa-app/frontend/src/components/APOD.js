// src/components/APODGallery.js
import React, { useState } from 'react';
import axios from 'axios';
import './APOD.css';
import { useNavigate } from 'react-router-dom';

const APOD = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [apods, setApods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAPODs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:5050/apod', {
        params: { start_date: startDate, end_date: endDate }
      });
      setApods(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      setError('Failed to fetch APODs! Please enter the correct dates.');
    }
    setLoading(false);
  };

  return (
    <div className='apod-background'>
      <h2 style={{ color: '#fff'}}>APOD Gallery</h2>
      <div>
        <label style={{ color: '#fff', fontWeight: 'bold'}}>
          Start Date
          <input className="date-input" style={{ marginLeft: '1rem' }} type="date" value={startDate}
            onChange={e => setStartDate(e.target.value)} />
        </label>
        <label style={{ color: '#fff', marginLeft: '2rem', fontWeight: 'bold'}}>
          End Date
          <input className="date-input" style={{ marginLeft: '1rem' }} type="date" value={endDate}
            onChange={e => setEndDate(e.target.value)} />
        </label>
        <button className="search-btn" onClick={fetchAPODs} disabled={!startDate || !endDate || loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
        <button onClick={() => navigate('/')} className="back-btn" style={{ marginLeft: '1rem' }}>
          Back to Homepage </button>
      {error && <div style={{color: 'red'}}>{error}</div>}
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px'}}>
        {apods.map(apod => (
          <div key={apod.date} style={{border: '1px solid #ccc', padding: '10px', width: '300px'}}>
            <h3 style={{ color: '#fff'}}>{apod.title}</h3>
            {apod.media_type === 'image' ? (
              <img src={apod.url} alt={apod.title} style={{width: '100%'}} />
            ) : (
              <iframe title={apod.title} src={apod.url} width="100%" height="200"></iframe>
            )}
            <p style={{ color: '#fff'}}>{apod.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  </div>  
  );
};

export default APOD;