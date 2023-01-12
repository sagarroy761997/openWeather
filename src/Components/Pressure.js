import React, { useContext } from 'react';

// import * as Widgets from 'fusioncharts/fusioncharts.widgets.js';
import FusionCharts from 'fusioncharts';

import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import allData from '../Context/allData';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
function Pressure() {
  const pressure = useContext(allData).pressure[0];
  const dataSource = {
    chart: {
      caption: 'Pressure Chart',
      lowerLimit: '500',
      upperLimit: '2000',
      showValue: '1',
      numberSuffix: 'hpa',
      theme: 'fusion',
      // showToolTip: "1",
    },
    colorRange: {
      color: [
        {
          minValue: '500',
          maxValue: '1000',
          code: '#e5f1fe',
        },
        {
          minValue: '1000',
          maxValue: '1500',
          code: '#629bdb',
        },
        {
          minValue: '1500',
          maxValue: '2000',
          code: '#0039cb',
        },
      ],
    },
    pointers: {
      pointer: [
        {
          value: pressure,
        },
      ],
    },
  };
  const chartConfigs = {
    type: 'hlineargauge',
    renderAt: 'chart-container',
    width: '100%',
    height: 160,
    dataFormat: 'json',
    dataSource,
    // baseFontSize: "30",
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ReactFC {...chartConfigs} />;
}

export default Pressure;
