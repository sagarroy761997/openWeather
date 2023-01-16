const CurrentCityData = (city: string) => fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}`,
).then((response) => response.json());

export default CurrentCityData;
