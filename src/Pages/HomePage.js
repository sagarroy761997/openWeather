import React, { useState, useEffect, useContext } from 'react';

import {
  Button, Typography, TextField, Box, Snackbar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CloseIcon from '@mui/icons-material/Close';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

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

const useStyles = makeStyles({
  root: {
    backgroundColor: '#b5d8fe',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    overflow: 'hidden',
    minHeight: '100vh',
    // height: '100vh',
  },
  out: {
    display: 'flex',
    // margin: '5% 0 5% 0',
    // height: '95%',
    // height: '100vh',
    // width: '95%',
    height: '100%',
    width: '100%',
    // borderRadius: '30px',
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
    borderRadius: '30px 0 0 30px',
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
    flexWrap: 'wrap',
    gap: '5%',
    alignItems: 'center',
  },
  linearGauge: {
    borderRadius: '30px',
    // marginRight: '5%',
    width: '30%',
    overflow: 'hidden',
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
    justifyContent: 'start !important',
    alignItems: 'center',
  },
  temp: {
    fontSize: '4em !important',
  },
  plusIcon: {
    color: 'white',
  },
  loader: {
    color: 'white !important',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  switch: {
    display: 'flex',
    alignItems: 'center',
  },
  Typography: {
    color: 'white',
    textAlign: 'left',
  },
  textfield: {
    backgroundColor: 'white',
    border: 'none !important',
    borderRadius: '4px',
    width: '100%',
  },
  submit: {
    backgroundColor: 'white !important',
    color: 'blue',
    width: '25% !important',
  },
  form: {
    marginTop: '15%',
  },
  submitBox: {
    marginTop: '7%',
    display: 'flex',
    justifyContent: 'end',
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
