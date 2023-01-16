import getLocation from '../../Location/getLocation';

const CurrentLocationData = async () => {
  const location = await getLocation();
  const latitude = location?.coords?.latitude;
  const longitude = location?.coords?.longitude;
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}`,
  ).then((response) => response.json());
};

export default CurrentLocationData;
