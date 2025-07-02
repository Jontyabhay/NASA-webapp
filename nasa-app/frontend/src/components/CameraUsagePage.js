import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function CameraUsagePieChart({ sol }) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(`http://localhost:5050/mars-photos/camera-usage?sol=${sol}`)
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

  return <Pie data={chartData} />;
}

function CameraUsagePage() {
  const [sol, setSol] = useState(1000);
  const [inputSol, setInputSol] = useState(1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSol(Number(inputSol));
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Mars Rover Camera Usage</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <label>
          Enter Sol (Martian day):&nbsp;
          <input
            type="number"
            value={inputSol}
            onChange={e => setInputSol(e.target.value)}
            min="0"
            style={{ width: 100 }}
          />
        </label>
        <button type="submit" style={{ marginLeft: 10 }}>Show</button>
      </form>
      <CameraUsagePieChart sol={sol} />
    </div>
  );
}

export default CameraUsagePage;