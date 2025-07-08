import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './css/MarsCameraUsage.css';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

function CameraUsagePieChart({ sol }) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://nasa-webapp.onrender.com/mars-photos?sol=${sol}`)
      .then(res => res.json())
      .then(setData);
  }, [sol]);

  if (!data) return <div>Loading...</div>;

  const chartData = {
    labels: Object.keys(data),
    datasets: [{
      data: Object.values(data),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800', '#9C27B0', '#00BCD4'],
    }]
  };

  return <Pie data={chartData} width={400} height={400}/>;
}

function MarsCameraUsage() {
  const [sol, setSol] = useState(1000);
  const [inputSol, setInputSol] = useState(1000);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSol(Number(inputSol));
  };

  // Render the component
  return (
    <div className='mars-background'>
        <h1 className='mars-title'>Mars Rover Camera Usage</h1>
        <h2 className='mars-description'>Visualize Images taken by various rover cameras for Curiosity, Opportunity and Spirit from landing date</h2>
          <form onSubmit={handleSubmit} className='mars-form'>
          <label>
            Enter Sol (Martian day):&nbsp;
            <input
            type="number"
            value={inputSol}
            onChange={e => setInputSol(e.target.value)}
            min="0"
            className="mars-input"
            />
          </label>
        <button type="submit" className="mars-button">Show</button>
        <button onClick={() => navigate('/')} className="mars-button" style={{ marginLeft: '1rem' }}>
          Back to Homepage </button>
      </form>
      <div className='pie-container'>
        <CameraUsagePieChart sol={sol}/>
      </div>
    </div>
  );
}

export default MarsCameraUsage;