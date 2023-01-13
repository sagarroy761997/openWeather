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
    regular: [dailyData, setDailyData],
    wind: [windSpeed, setWindSpeed],
    pressure: [pressure, setPressure],
    feelsLike: [feelsLike, setFeelsLike],
    humidity: [humidity, setHumidity],
    newCity: [differentCity, setDifferentCity],
  };
  // const value = useMemo(() => contextData, []);
  return (
    <allData.Provider value={contextData}>
      <HomePage />
    </allData.Provider>
  );
}

export default App;
