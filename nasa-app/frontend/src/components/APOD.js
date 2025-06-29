// frontend/src/components/APOD.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const APOD = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const response = await axios.get('http://localhost:5050/apod');
        console.log('Frontend received data:', response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching APOD data:', error);
      }
    };
    fetchAPOD();
  }, []);

  return (
    <div>
       <button
        onClick={() => navigate('/')}
        style={{
          margin: '1rem 0',
          padding: '0.5rem 1.5rem',
          borderRadius: '20px',
          border: 'none',
          background: 'linear-gradient(90deg, purple 0%, pink 100%)',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        ← Back to Homepage
      </button> 
      {data ? (
        <div>
          <h1>{data.title}</h1>
          <p>{data.explanation}</p>
          <img src={data.url} alt={data.title} style={{ maxWidth: '100%' }} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default APOD;