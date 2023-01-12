import React, { useState, useEffect, useContext } from 'react';

import {
  Button,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';

import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import allData from '../Context/allData';

import RainProbability from '../Components/RainProbability';
import Pressure from '../Components/Pressure';
import Humidity from '../Components/Humidity';
import FeelsLike from '../Components/FeelsLike';
import WindSpeed from '../Components/WindSpeed';

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import CurrentLocationData from '../Helpers/Api/CurrentDataApi/CurrentLocationData';
import HourlyLocationData from '../Helpers/Api/HourlyDataApi/HourlyLocationData';
import CurrentCityData from '../Helpers/Api/CurrentDataApi/CurrentCityData';
import HourlyCityData from '../Helpers/Api/HourlyDataApi/HourlyCityData';

const useStyles = makeStyles({
  root: {
    // height:'100vh',
    backgroundColor: '#b5d8fe',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  out: {
    display: 'flex',
    margin: '5% 0 5% 0',
    height: '95%',
    width: '95%',
    borderRadius: '30px',
    backgroundColor: '#5d9ce6',
  },
  data: {
    padding: '2% 2% 2% 2%',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent:'space-around',
    width: '30%',
    height: '100%',
    color: 'white',
  },
  dayNight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  day: {
    display: 'flex',
    alignItems: 'center',
  },
  night: {
    display: 'flex',
    alignItems: 'center',
  },
  graphs: {
    height: '100%',
    width: '70%',
    backgroundColor: '#e4f1ff',
    borderRadius: '30px',
  },
  areaChart: {
    borderRadius: '30px',
    margin: '5%',

    width: '90%',
    overflow: 'hidden',
  },
  innerBox1: {
    margin: '5%',
    display: 'flex',
    // flexWrap: 'wrap',
    gap: '5%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rain: {
    borderRadius: '30px',
    marginRight: '5%',
    width: '33.33%',
    overflow: 'hidden',
  },
  feelsLike: {
    borderRadius: '30px',
    marginRight: '5%',
    overflow: 'hidden',
    width: '33.33%',
  },
  humidity: {
    borderRadius: '30px',
    overflow: 'hidden',
    width: '33.33%',
  },

  innerBox2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  windSpeed: {
    borderRadius: '30px',

    overflow: 'hidden',
    width: '33.33%',
  },
  mainTemp: {
    color: 'black',
    width: '100%',
    height: '30%',
  },
  buttons: {
    color: 'black',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  temp: {
    fontSize: '4em !important',
  },
  plusIcon: {
    color: 'white',
  },
});

function HomePage() {
  const classes = useStyles();

  const [mainTemp, setMainTemp] = useState('');
  const [country, setCountry] = useState('');

  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [unitTemp, setUnitTemp] = useState(' °C');
  const setDailyData = useContext(allData).regular[1];
  const setWindSpeed = useContext(allData).wind[1];
  const setPressure = useContext(allData).pressure[1];
  const setFeelsLike = useContext(allData).feelsLike[1];
  const setHumidity = useContext(allData).humidity[1];
  const [checked, setChecked] = useState('false');
  const [day, setDay] = useState('');
  const [night, setNight] = useState('');
  const [differentCity, setDifferentCity] = useContext(allData).newCity;
  const [date, setDate] = useState(new Date().toDateString());

  const locationWeatherHelperFunction = () => {
    CurrentLocationData().then((response) => {
      setMainTemp(response?.main?.temp);
      setCountry(response?.sys?.country);
      setArea(response?.name);
      setWindSpeed(response?.wind?.speed);
      setPressure(response?.main?.pressure);
      setFeelsLike(response?.main?.feels_like);
      setHumidity(response?.main?.humidity);
      setIcon(response?.weather?.[0]?.icon);
      setDescription(response?.weather?.[0]?.description.toUpperCase());
      setChecked(false);
      setUnitTemp(' °C');

      setDay(
        new Date(
          parseInt(response?.sys?.sunrise, 10) * 1000,
        ).toLocaleTimeString(),
      );
      setNight(
        new Date(
          parseInt(response?.sys?.sunset, 10) * 1000,
        ).toLocaleTimeString(),
      );
    });
    HourlyLocationData().then((response) => {
      setDailyData(
        response.list.map((element) => ({
          label: new Date(
            parseInt(element?.dt, 10) * 1000,
          ).toLocaleDateString(),
          value: element.main.humidity,
        })),
      );
    });
  };

  useEffect(() => {
    locationWeatherHelperFunction();
  }, []);

  const cityWeatherHelperFunction = async () => {
    CurrentCityData(differentCity).then((response) => {
      setMainTemp(response?.main?.temp);
      setCountry(response?.sys?.country);
      setArea(response?.name);
      setWindSpeed(response?.wind?.speed);
      setPressure(response?.main?.pressure);
      setFeelsLike(response?.main?.feels_like);
      setHumidity(response?.main?.humidity);
      setIcon(response?.weather?.[0]?.icon);
      setDescription(response?.weather?.[0]?.description.toUpperCase());
      setChecked(false);
      setUnitTemp(' °C');
      setDate(new Date(parseInt(response?.dt, 10) * 1000).toDateString());

      setDay(
        new Date(
          parseInt(response?.sys?.sunrise, 10) * 1000,
        ).toLocaleTimeString(),
      );
      setNight(
        new Date(
          parseInt(response?.sys?.sunset, 10) * 1000,
        ).toLocaleTimeString(),
      );
    });
    HourlyCityData(differentCity).then((response) => {
      setDailyData(
        response.list.map((element) => ({
          label: new Date(
            parseInt(element?.dt, 10) * 1000,
          ).toLocaleDateString(),
          value: element.main.humidity,
        })),
      );
    });
  };
  const changeCity = (event) => {
    setDifferentCity(event.target.value);
  };
  const conversion = () => {
    if (mainTemp) {
      if (unitTemp === ' °C') {
        setMainTemp(((9 / 5) * mainTemp + 32).toFixed(2));
        setUnitTemp(' °F');
      } else {
        setMainTemp(((mainTemp - 32) * (5 / 9)).toFixed(2));
        setUnitTemp(' °C');
      }
    }
  };
  const switchHandler = () => {
    conversion();
    setChecked(!checked);
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.out}>
        <Box className={classes.data}>
          <Box className={classes.buttons}>
            <IconButton onClick={cityWeatherHelperFunction}>
              <AddBoxIcon className={classes.plusIcon} />
            </IconButton>
            <Box>
              °C
              <Switch
                onChange={switchHandler}
                checked={checked}
              />
              °F
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Box className={classes.location}>
                <NearMeOutlinedIcon fontSize="small" />
                <Box>{`${area}, ${country}`}</Box>
              </Box>
              <Box>{date}</Box>
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
              >
                {`${mainTemp} ${unitTemp}`}
              </Typography>
            </Box>
            <Box>
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="weatherIcon"
              />
            </Box>
            <Box>{description}</Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField value={differentCity} onChange={changeCity} />
            <Button onClick={cityWeatherHelperFunction}>Submit</Button>

          </Box>
        </Box>
        <Box className={classes.graphs}>
          <Box className={classes.areaChart}>
            <RainProbability />
          </Box>
          <Box className={classes.innerBox1}>
            <Box className={classes.rain}>
              <Pressure />
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
  );
}

export default HomePage;
