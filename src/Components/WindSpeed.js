import React, { useContext } from 'react';

import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionCharts from 'fusioncharts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import Charts from 'fusioncharts/fusioncharts.charts';
import allData from '../Context/allData';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme, Widgets);

function WindSpeed() {
  const windSpeed = useContext(allData).wind[0];
  const chartConfigs = {
    type: 'angulargauge',
    renderAt: 'chart-container',
    width: '100%',
    height: '200',
    dataFormat: 'json',
    dataSource: {
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
    },

  };
  const {
    type, renderAt, width, height, dataFormat, dataSource,
  } = chartConfigs;
  return (
    <ReactFC
      type={type}
      width={width}
      dataFormat={dataFormat}
      renderAt={renderAt}
      height={height}
      dataSource={dataSource}
    />
  );
}
export default WindSpeed;
