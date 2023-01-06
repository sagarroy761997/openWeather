
import axios from "axios";

import getLocation from "./getLocation";
const [latitude, longitude] = getLocation();
let currentWeatherData ;
const currentWeatherApi = async () => {
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}`
    )
    .then((fetched) => {
      currentWeatherData(fetched?.data);
    })
    .catch((error) => console.log(error));

  console.log( currentWeatherData);
};

export default currentWeatherApi;
