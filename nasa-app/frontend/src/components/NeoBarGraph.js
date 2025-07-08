import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import './css/NeoBarGraph.css';
  import { useNavigate } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function NeoBarGraph() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setChartData(null);
    try {
      const res = await axios.get('https://nasa-webapp.onrender.com/api/neo-feed', {
        params: { start_date: startDate, end_date: endDate }
      });
      const neoData = res.data.near_earth_objects;
      const dates = Object.keys(neoData);
      const counts = dates.map(date => neoData[date].length);

      setChartData({
        labels: dates,
        datasets: [{
          label: 'Number of NEOs',
          data: counts,
          backgroundColor: 'rgba(75,192,192,0.6)'
        }]
      });
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError(err.message || 'Failed to fetch data. Please check your dates.');
        }
      }
    setLoading(false);
  };
  // Render the component
  return (
    <div className='neo-background'>
      <h1 style={{ color: '#fff'}}>Near Eath Objects Bar Graph</h1>
      <h2 className='neo-description'>Visualize a list of Asteroids based on their closest approach date to Earth (end date should be not more than 7 days from start date)</h2>
      <form onSubmit={fetchData}>
        <label style={{ color: '#fff', fontWeight: 'bold'}}>
          Start Date:
          <input className="date-input" style={{ marginLeft: '1rem' }} type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
        </label>
        <label style={{ color: '#fff', fontWeight: 'bold'}}>
          End Date:
          <input className="date-input" style={{ marginLeft: '1rem' }} type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
        </label>
        <button className="fetch-btn" type="submit">Fetch Data</button>
        <button onClick={() => navigate('/')} className="back-btn" style={{ marginLeft: '1rem' }}>
          Back to Homepage </button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div style={{color: 'red'}}>{error}</div>}
      {chartData && <Bar data={chartData} />}
    </div>
  );
}

export default NeoBarGraph;