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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function NeoBarGraph() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setChartData(null);
    try {
      const res = await axios.get('http://localhost:5050/api/neo-feed', {
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

  return (
    <div>
      <h2>NEO Bar Graph</h2>
      <form onSubmit={fetchData}>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
        </label>
        <button type="submit">Fetch Data</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div style={{color: 'red'}}>{error}</div>}
      {chartData && <Bar data={chartData} />}
    </div>
  );
}

export default NeoBarGraph;