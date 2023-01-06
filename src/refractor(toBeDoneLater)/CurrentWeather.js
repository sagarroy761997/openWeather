import { Box } from "@mui/material";
import React from "react";
import currentWeatherApi from "./currentWeatherApi";
const currentWeatherData = currentWeatherApi();
console.log(currentWeatherData);
const CurrentWeather = () => {
  return (
    <>
      {/* <Box className={classes.data}>
        <Box className={classes.elements}>
          <Button className={classes.button} onClick={getLocation}>
            <LocationOnIcon />
          </Button>
          <Switch onChange={conversion} />
        </Box>
        <Box>
          {area},{country}
        </Box>
        <Box className={classes.description}>
          <Box>
            <h1>
              {mainTemp}*{unitTemp}
            </h1>
          </Box>
          <Box>{sky}</Box>
        </Box>
      </Box> */}
    </>
  );
};

export default CurrentWeather;
