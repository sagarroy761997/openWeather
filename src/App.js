import React, { useState } from 'react';

import allData from './Context/allData';
import HomePage from './Pages/HomePage';

function App() {
  const [dailyData, setDailyData] = useState({});
  const [windSpeed, setWindSpeed] = useState('');
  const [pressure, setPressure] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [humidity, setHumidity] = useState('');
  const [differentCity, setDifferentCity] = useState('');
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextData = {
    dailyData,
    setDailyData,
    windSpeed,
    setWindSpeed,
    pressure,
    setPressure,
    feelsLike,
    setFeelsLike,
    humidity,
    setHumidity,
    differentCity,
    setDifferentCity,
  };

  return (
    <allData.Provider value={contextData}>
      <HomePage />
    </allData.Provider>
  );
}

export default App;
