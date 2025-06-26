import React from 'react';
import APOD from './components/APOD';

function App() {
  return (
    <div className="App">
      <header>
        <h1>NASA Space Explorer</h1>
      </header>
      <main>
        <APOD />
      </main>
    </div>
  );
}

export default App;