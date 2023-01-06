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
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';

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
    padding: "2% 0 2% 2%",
    display: "flex",
    flexDirection:'column',
    // justifyContent:'space-between',
    width: "30%",
    height: "100%",
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
  temp:{
    fontSize:'3em !important'
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
  const [checked, setChecked] = useState('false')
  const [day, setDay] = useState('');
  const [night, setNight] = useState('')
  // console.log(useContext(LocationContext));
  const date = new Date();
  useEffect(() => {
    getLocation();
  }, []);
  // const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  //   width: 62,
  //   height: 34,
  //   padding: 7,
  //   "& .MuiSwitch-switchBase": {
  //     margin: 1,
  //     padding: 0,
  //     transform: "translateX(6px)",
  //     "&.Mui-checked": {
  //       color: "#fff",
  //       transform: "translateX(22px)",
  //       "& .MuiSwitch-thumb:before": {
  //         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
  //           "#fff"
  //         )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
  //       },
  //       "& + .MuiSwitch-track": {
  //         opacity: 1,
  //         backgroundColor:
  //           theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
  //       },
  //     },
  //   },
  //   "& .MuiSwitch-thumb": {
  //     backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
  //     width: 32,
  //     height: 32,
  //     "&:before": {
  //       content: "''",
  //       position: "absolute",
  //       width: "100%",
  //       height: "100%",
  //       left: 0,
  //       top: 0,
  //       backgroundRepeat: "no-repeat",
  //       backgroundPosition: "center",
  //       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
  //         "#fff"
  //       )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
  //     },
  //   },
  //   "& .MuiSwitch-track": {
  //     opacity: 1,
  //     backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
  //     borderRadius: 20 / 2,
  //   },
  // }));

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
              setWeatherData(fetched?.data);
              setMainTemp(fetched?.data?.main?.temp);
              setCountry(fetched?.data?.sys?.country);
              setSky(fetched?.data?.weather?.[0]?.main);
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
              // setDay(((Date(fetched?.data?.sys?.sunrise))).toString().toDateString());
              // setDay(new Date(fetched?.data?.sys?.sunrise).toString())
              // console.log(day)
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
                <Switch onChange={()=>{conversion();setChecked(!checked);}} checked={checked}/>
                {"°F"}
                {/* <FormControlLabel
                  control={<MaterialUISwitch sx={{ m: 1 }} onChange={conversion} checked={checked}/>}
                  // label="MUI switch"
                /> */}
              </Box>
            </Box>
            <Box className={classes.location}>
              <NearMeOutlinedIcon fontSize="small"/>
              <Box>
                {`${area}, ${country}`}
              </Box>
              
            </Box>
            <Box>{date.toDateString()}</Box>
            {day}
            <Box className={classes.description}>
              <Box>
                <Typography className={classes.temp}>{`${mainTemp} ${unitTemp}`}</Typography>
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
