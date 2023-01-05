import React, { useState, useEffect } from "react";

import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Switch from "@mui/material/Switch";
import LocationContext from "../Context/LocationContext";
import { useContext } from "react";

import Chart from "./Chart";
import Rain from "./Rain";
import Humidity from './Humidity';
import WindSpeed from "./WindSpeed";
import FeelsLike from "./FeelsLike";

const useStyles = makeStyles({
  root: {
    fontFamily: `'Roboto', 'sans-serif'`,
    backgroundColor: "#b5d8fe",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  out: {
    display: "flex",
    margin: '5% 0 5% 0',
    alignItems: "center",
    // border: "1px solid black",
    height: "85%",
    width: "90%",
    borderRadius: "30px",
    backgroundColor: "#5d9ce6 !important",
  },
  data: {
    width: "30%",
    height: "100%",
  },
  graphs: {
    height: "100%",
    width: "70%",
    backgroundColor: "#e4f1ff !important",
    borderRadius: "30px",
    // padding: '10%'
  },
  areaChart:{
    borderRadius:'30px',
    margin: '5%',
    width: '90% !important',
    overflow:'hidden',
  
  },
  innerBox1:{
    margin:'5%',
    display: 'flex',
    justifyContent:'space-between !important',
    alignItems: 'center'
  },
  rain:{
    borderRadius:"30px",
    marginRight:'5%',
    width: '33.33% !important',
    overflow:'hidden',
    
  },
  feelsLike:{
    borderRadius:"30px",
    marginRight:'5%',
    overflow:'hidden',
    width: '33.33% !important',
    
  },
  humidity:{
    borderRadius:"30px",
    overflow:'hidden',
    width: '33.33% !important',
    
  },
  
  innerBox2:{
    display: 'flex !important',
    justifyContent:'center !important',
    alignItems: 'center !important',
    marginBottom:'5%',
  },
  windSpeed:{
    borderRadius:"30px",
    
    overflow:'hidden',
    width: '33.33% !important',
    
  },
  mainTemp: {
    color: "black",
    width: "100%",
    height: "30%",
  },
  button: {
    margin: "5px !important",
  },
  elements: {
    color: "black",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Ui = () => {
  const classes = useStyles();
  const ApiKey = "997ab7cd6af8512da86c85adc9ef5450";
  const [weatherData, setWeatherData] = useState("");
  const [mainTemp, setMainTemp] = useState("");
  const [country, setCountry] = useState("");
  const [sky, setSky] = useState("");
  const [area, setArea] = useState("");
  const [unitTemp, setUnitTemp] = useState("C");
  const [dailyData, setDailyData] = useContext(LocationContext).regular;
  const [windSpeed, setWindSpeed] = useContext(LocationContext).wind;
  const [pressure, setPressure] = useContext(LocationContext).pressure;
  const [feelsLike, setFeelsLike] = useContext(LocationContext).feelsLike;
  const [humidity, setHumidity] = useContext(LocationContext).humidity;
  console.log(useContext(LocationContext));

  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${ApiKey}`
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
            }
          });
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${ApiKey}`
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
      if (unitTemp === "C") {
        setMainTemp(((9 / 5) * mainTemp + 32).toFixed(2));
        setUnitTemp("F");
      } else {
        setMainTemp(((mainTemp - 32) * (5 / 9)).toFixed(2));
        setUnitTemp("C");
      }
    }
  };
  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.out}>
          <Box className={classes.data}>
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
              <WindSpeed/>
            </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Ui;
