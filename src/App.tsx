import React, {useState} from "react";

import { allData } from "./Context/dataContext";

import HomePage from "./Pages/HomePage";


function App() {

  const [dailyData, setDailyData] = useState([{
    label: new Date()
      .toString(), value: 60
  }]);
  const [windSpeed, setWindSpeed] = useState("");
  const [pressure, setPressure] = useState("");
  const [feelsLike, setFeelsLike] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");
  const [differentCity, setDifferentCity] = useState<string>("");

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
    <allData.Provider value = {contextData}>
      <HomePage />
    </allData.Provider>
  );
}

export default App;
