import React, { useState, useEffect, useContext } from 'react';

import {
  Button, Typography, TextField, Box, Snackbar,
} from '@mui/material';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import useStyles from '../UI/ui';
import allData from '../Context/allData';
import RainProbability from '../Components/RainProbability';
import Pressure from '../Components/Pressure';
import Humidity from '../Components/Humidity';
import FeelsLike from '../Components/FeelsLike';
import WindSpeed from '../Components/WindSpeed';

import CurrentLocationData from '../Helpers/Api/CurrentDataApi/CurrentLocationData';
import HourlyLocationData from '../Helpers/Api/HourlyDataApi/HourlyLocationData';
import CurrentCityData from '../Helpers/Api/CurrentDataApi/CurrentCityData';
import HourlyCityData from '../Helpers/Api/HourlyDataApi/HourlyCityData';
import conversion from '../Helpers/TempConversion/conversion';

function HomePage() {
  const classes = useStyles();
  const [mainTemp, setMainTemp] = useState('');
  const [country, setCountry] = useState('');

  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [area, setArea] = useState('');
  const [unitTemp, setUnitTemp] = useState(' °C');
  const {
    setDailyData,
    setWindSpeed,
    setPressure,
    setFeelsLike,
    setHumidity,
    differentCity,
    setDifferentCity,
  } = useContext(allData);
  const [checked, setChecked] = useState(false);
  const [day, setDay] = useState('');
  const [night, setNight] = useState('');

  const [date, setDate] = useState(new Date().toDateString());
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      setLoading(false);
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
          label: new Date(parseInt(element?.dt, 10) * 1000)
            .toString()
            .slice(3, 21),
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
      if (response.cod === 200) {
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
      } else {
        handleClick();
      }
    });
    HourlyCityData(differentCity).then((response) => {
      setDailyData(
        response.list.map((element) => ({
          label: new Date(parseInt(element?.dt, 10) * 1000)
            .toString()
            .slice(3, 21),
          value: element.main.humidity,
        })),
      );
    });
    setDifferentCity('');
  };
  const changeCity = (event) => {
    setDifferentCity(event.target.value);
  };
  // const conversion1 = () => {
  //   if (mainTemp) {
  //     if (unitTemp === ' °C') {
  //       setMainTemp(((9 / 5) * mainTemp + 32).toFixed(2));
  //       setUnitTemp(' °F');
  //     } else {
  //       setMainTemp(((mainTemp - 32) * (5 / 9)).toFixed(2));
  //       setUnitTemp(' °C');
  //     }
  //   }
  // };
  const tempConversion = () => {
    const { newTemp, newUnitTemp } = conversion(mainTemp, unitTemp);
    setMainTemp(newTemp);
    setUnitTemp(newUnitTemp);
  };
  const switchHandler = () => {
    tempConversion();
    setChecked(!checked);
  };
  const action = (
    <>
      <Button color="primary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <Box className={classes.root}>
      {loading ? (
        <CircularProgress
          size={150}
          variant="indeterminate"
          className={classes.loader}
        />
      ) : (
        <Box className={classes.out}>
          <Box className={classes.data}>
            <Box className={classes.buttons}>
              <IconButton onClick={handleClick}>
                <AddBoxIcon className={classes.plusIcon} />
              </IconButton>
              <Box className={classes.switch}>
                <Typography className={classes.Typography}>°C</Typography>
                <Switch onChange={switchHandler} checked={checked} />
                <Typography className={classes.Typography}>°F</Typography>
              </Box>
            </Box>
            <Box className={classes.details}>
              <Box>
                <Typography className={classes.Typography}>
                  <NearMeOutlinedIcon fontSize="small" />
                  {`${area}, ${country}`}
                </Typography>
                <Typography className={classes.Typography}>{date}</Typography>
              </Box>
              <Box className={classes.dayNight}>
                <Box className={classes.day}>
                  <Typography className={classes.Typography}>
                    <WbSunnyIcon fontSize="small" />
                    {day}
                  </Typography>
                </Box>
                <Typography className={classes.Typography}>
                  <BedtimeIcon fontSize="small" />
                  {night}
                </Typography>
              </Box>
            </Box>
            <Box className={classes.description}>
              <Typography className={classes.temp}>
                {`${mainTemp} ${unitTemp}`}
              </Typography>
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                alt="weatherIcon"
              />
              <Typography className={classes.Typography}>
                {description}
              </Typography>
            </Box>
            <Box className={classes.form}>
              <TextField
                className={classes.textfield}
                value={differentCity}
                onChange={changeCity}
              />
              <Box className={classes.submitBox}>
                <Button
                  onClick={cityWeatherHelperFunction}
                  className={classes.submit}
                >
                  Submit
                </Button>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  message="City Not Found"
                  action={action}
                />
              </Box>
            </Box>
          </Box>
          <Box className={classes.graphs}>
            <Box className={classes.areaChart}>
              <RainProbability />
            </Box>
            <Box className={classes.innerBox1}>
              <Box className={classes.linearGauge}>
                <Pressure />
              </Box>
              <Box className={classes.linearGauge}>
                <FeelsLike />
              </Box>
              <Box className={classes.linearGauge}>
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
      )}
    </Box>
  );
}

export default HomePage;
