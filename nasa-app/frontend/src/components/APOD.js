// frontend/src/components/APOD.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const APOD = () => {
  const [data, setData] = useState(null);

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