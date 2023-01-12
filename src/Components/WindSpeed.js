import React, { useContext } from 'react';
// eslint-disable-next-line import/extensions
import * as Widgets from 'fusioncharts/fusioncharts.widgets.js';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import allData from '../Context/allData';

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme, Widgets);

function WindSpeed() {
  const windSpeed = useContext(allData).wind[0];
  const dataSource = {
    chart: {
      caption: 'Wind Speed',
      lowerLimit: '0',
      upperLimit: '100',
      theme: 'fusion',
      showValue: '1',
      numberSuffix: 'm/s',
    },
    colorRange: {
      color: [{
        minValue: '0',
        maxValue: '35',
        code: '#e5f1fe',
      },
      {
        minValue: '35',
        maxValue: '70',

        code: '#629bdb',
      },
      {
        minValue: '70',
        maxValue: '100',
        code: '#0039cb',
      },
      ],
    },
    dials: {
      dial: [
        { value: windSpeed },
      ],

    },
  };
  const chartConfigs = {
    type: 'angulargauge',
    numberSuffix: '%',
    renderAt: 'chart-container',
    width: '100%',
    dataFormat: 'json',
    dataSource,

  };
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ReactFC {...chartConfigs} />
  );
}
export default WindSpeed;
