/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';

import allData from './Context/allData';
import HomePage from './Pages/HomePage';

function App() {
  const [dailyData, setDailyData] = useState({});
  const [windSpeed, setWindSpeed] = useState('');
  const [pressure, setPressure] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [humidity, setHumidity] = useState('');
  const [differentCity, setDifferentCity] = useState('Malda');
  return (
    <allData.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        regular: [dailyData, setDailyData],
        wind: [windSpeed, setWindSpeed],
        pressure: [pressure, setPressure],
        feelsLike: [feelsLike, setFeelsLike],
        humidity: [humidity, setHumidity],
        newCity: [differentCity, setDifferentCity],
      }}
    >
      <HomePage />
    </allData.Provider>
  );
}

export default App;
