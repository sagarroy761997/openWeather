import { useState } from 'react';

import Ui from './Components/Ui';

import LocationContext from './Context/LocationContext';
function App() {
  const [dailyData, setDailyData] = useState({})
  const [windSpeed, setWindSpeed] = useState('')
  const [pressure, setPressure] = useState('')
  const [feelsLike, setFeelsLike] = useState('')
  const [humidity, setHumidity] = useState('')
  return (
    <LocationContext.Provider value={{regular: [dailyData, setDailyData], wind: [windSpeed, setWindSpeed], pressure: [pressure, setPressure], feelsLike:[feelsLike, setFeelsLike], humidity:[humidity, setHumidity] }}>
    <Ui/>
    
    </LocationContext.Provider>
  );
}

export default App;
