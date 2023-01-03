import { useState } from 'react';
import Ui from './Components/Ui';
import LocationContext from './Context/LocationContext';
function App() {
  const [dailyData, setDailyData] = useState({})
  return (
    <LocationContext.Provider value={[dailyData, setDailyData]}>
    <Ui/>
    </LocationContext.Provider>
  );
}

export default App;
