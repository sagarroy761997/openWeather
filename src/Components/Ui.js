import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Switch from "@mui/material/Switch";
import LocationContext from "../Context/LocationContext";
import { useContext } from "react";
const useStyles = makeStyles({

  root: {
    fontFamily: `'Roboto', 'sans-serif'`,
    backgroundColor: "#b5d8fe",
    border: 0,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  out: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // border: "1px solid black",
    height: "70vh",
    width: "70vw",
    borderRadius: "30px",
  },
  data: {
    width: "30%",
    height: "100%",
    backgroundColor: "#5d9ce6 !important",
    borderRadius: "30px",
  },
  charts: {
    width: "70%",
    backgroundColor: "#e4f1ff !important",
  },
  locationTemp: {
    color: "black",
    display: "flex",
    justifyContent: "space-between",
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
  const [dailyData, setDailyData] = useContext(LocationContext);
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
              // console.log(fetched?.data);
              setWeatherData(fetched?.data);
              setMainTemp(fetched?.data?.main?.temp);
              setCountry(fetched?.data?.sys?.country);
              setSky(fetched?.data?.weather?.[0]?.main);
              setArea(fetched?.data?.name);
            }
          });
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${ApiKey}`
          )
          .then((fetched) => {
            console.log(fetched.data)
            setDailyData(fetched.data.list.map((element)=>{return({label:element.main.temp, value:element.clouds.all})}));
            
          })
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
            <Box className={classes.locationTemp}>
              <Box>
                {area},{country}
              </Box>
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
          <Box className={classes.charts}>
            <Chart />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Ui;
