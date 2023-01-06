import axios from "axios";

import getLocation from "./getLocation";
const [latitude, longitude] = getLocation();
let dailyWeatherData;
const dailyWeatherApi = async () => {
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}`
    )
    .then((fetched) => {
      dailyWeatherData(fetched?.data);
    })
    .catch((error) => console.log(error));

  return dailyWeatherData;
};

export default dailyWeatherApi;
