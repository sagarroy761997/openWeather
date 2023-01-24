import { makeStyles } from '@mui/styles';

export default makeStyles({
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
