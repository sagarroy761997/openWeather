const HourlyCityData = (city: string) => fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}`,
).then((response) => response.json());

export default HourlyCityData;
