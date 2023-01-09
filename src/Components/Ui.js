import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Switch from "@mui/material/Switch";
import LocationContext from "../Context/LocationContext";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

import Chart from "./Chart";
import Rain from "./Rain";
import Humidity from "./Humidity";
import WindSpeed from "./WindSpeed";
import FeelsLike from "./FeelsLike";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#b5d8fe",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  out: {
    display: "flex",
    margin: "5% 0 5% 0",
    height: "85%",
    width: "90%",
    borderRadius: "30px",
    backgroundColor: "#5d9ce6 !important",
  },
  data: {
    padding: "2% 2% 2% 2%",
    display: "flex",
    flexDirection: "column",
    // justifyContent:'space-around',
    width: "30%",
    height: "100%",
  },
  dayNight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  day: {
    display: "flex",
    alignItems: "center",
  },
  night: {
    display: "flex",
    alignItems: "center",
  },
  graphs: {
    height: "100%",
    width: "70%",
    backgroundColor: "#e4f1ff !important",
    borderRadius: "30px",
  },
  areaChart: {
    borderRadius: "30px",
    margin: "5%",
    width: "90% !important",
    overflow: "hidden",
  },
  innerBox1: {
    margin: "5%",
    display: "flex",
    justifyContent: "space-between !important",
    alignItems: "center",
  },
  rain: {
    borderRadius: "30px",
    marginRight: "5%",
    width: "33.33% !important",
    overflow: "hidden",
  },
  feelsLike: {
    borderRadius: "30px",
    marginRight: "5%",
    overflow: "hidden",
    width: "33.33% !important",
  },
  humidity: {
    borderRadius: "30px",
    overflow: "hidden",
    width: "33.33% !important",
  },

  innerBox2: {
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    marginBottom: "5%",
  },
  windSpeed: {
    borderRadius: "30px",

    overflow: "hidden",
    width: "33.33% !important",
  },
  mainTemp: {
    color: "black",
    width: "100%",
    height: "30%",
  },
  buttons: {
    color: "black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
  },
  description: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: "3em !important",
  },
});

const Ui = () => {
  const classes = useStyles();
  const [weatherData, setWeatherData] = useState("");
  const [mainTemp, setMainTemp] = useState("");
  const [country, setCountry] = useState("");
  const [sky, setSky] = useState("");
  const [icon, setIcon] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [unitTemp, setUnitTemp] = useState(" °C");
  const [dailyData, setDailyData] = useContext(LocationContext).regular;
  const [windSpeed, setWindSpeed] = useContext(LocationContext).wind;
  const [pressure, setPressure] = useContext(LocationContext).pressure;
  const [feelsLike, setFeelsLike] = useContext(LocationContext).feelsLike;
  const [humidity, setHumidity] = useContext(LocationContext).humidity;
  const [checked, setChecked] = useState("false");
  const [day, setDay] = useState("");
  const [night, setNight] = useState("");
  // console.log(useContext(LocationContext));
  const date = new Date();
  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}`
          )
          .then((fetched) => {
            if (fetched.status === 200) {
              console.log(fetched?.data);
              setMainTemp(fetched?.data?.main?.temp);
              setCountry(fetched?.data?.sys?.country);
              setArea(fetched?.data?.name);
              setWindSpeed(fetched?.data?.wind?.speed);
              setPressure(fetched?.data?.main?.pressure);
              setFeelsLike(fetched?.data?.main?.feels_like);
              setHumidity(fetched?.data?.main?.humidity);
              setIcon(fetched?.data?.weather?.[0]?.icon);
              setDescription(
                fetched?.data?.weather?.[0]?.description.toUpperCase()
              );
              setChecked(false);
              setUnitTemp(" °C");

              setDay(
                new Date(
                  parseInt(fetched?.data?.sys?.sunrise) * 1000
                ).toLocaleTimeString()
              );
              setNight(
                new Date(
                  parseInt(fetched?.data?.sys?.sunset) * 1000
                ).toLocaleTimeString()
              );
            }
          });
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}`
          )
          .then((fetched) => {
            setDailyData(
              fetched.data.list.map((element) => {
                return { label: element.main.temp, value: element.clouds.all };
              })
            );
          });
        // .catch((err) => console.log(err));
      });
    } else {
      /* geolocation IS NOT available */
    }
  };

  const conversion = () => {
    if (mainTemp) {
      if (unitTemp === " °C") {
        setMainTemp(((9 / 5) * mainTemp + 32).toFixed(2));
        setUnitTemp(" °F");
      } else {
        setMainTemp(((mainTemp - 32) * (5 / 9)).toFixed(2));
        setUnitTemp(" °C");
      }
    }
  };
  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.out}>
          <Box className={classes.data}>
            <Box className={classes.buttons}>
              <IconButton onClick={getLocation}>
                <AddBoxIcon />
              </IconButton>
              <Box>
                {"°C"}
                <Switch
                  onChange={() => {
                    conversion();
                    setChecked(!checked);
                  }}
                  checked={checked}
                />
                {"°F"}
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Box className={classes.location}>
                  <NearMeOutlinedIcon fontSize="small" />
                  <Box>{`${area}, ${country}`}</Box>
                </Box>
                <Box>{date.toDateString()}</Box>
              </Box>
              <Box className={classes.dayNight}>
                <Box className={classes.day}>
                  <Box>
                    <WbSunnyIcon fontSize="small" />
                  </Box>
                  <Box>{day}</Box>
                </Box>
                <Box className={classes.night}>
                  <Box>
                    <BedtimeIcon fontSize="small" />
                  </Box>
                  <Box>{night}</Box>
                </Box>
              </Box>
            </Box>

            <Box className={classes.description}>
              <Box>
                <Typography
                  className={classes.temp}
                >{`${mainTemp} ${unitTemp}`}</Typography>
              </Box>
              <Box>
                <img
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt="weatherIcon"
                ></img>
              </Box>
              <Box>{description}</Box>
            </Box>
          </Box>
          <Box className={classes.graphs}>
            <Box className={classes.areaChart}>
              <Chart />
            </Box>
            <Box className={classes.innerBox1}>
              <Box className={classes.rain}>
                <Rain />
              </Box>
              <Box className={classes.feelsLike}>
                <FeelsLike />
              </Box>
              <Box className={classes.humidity}>
                <Humidity />
              </Box>
            </Box>
            <Box className={classes.innerBox2}>
              <Box className={classes.windSpeed}>
                <WindSpeed />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Ui;
