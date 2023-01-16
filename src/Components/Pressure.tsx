import React, { useContext } from 'react';

// eslint-disable-next-line no-unused-vars
import * as Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionCharts from 'fusioncharts';

import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import {allData} from '../Context/dataContext';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme, Widgets);
function Pressure() {
  const {pressure} = useContext(allData);

  const chartConfigs = {
    type: 'hlineargauge',
    renderAt: 'chart-container',
    width: '100%',
    height: 160,
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'PressureChart',
        lowerLimit: '850',
        upperLimit: '2000',
        showValue: '1',
        numberSuffix: 'hpa',
        theme: 'fusion',
        // showToolTip: "1",
        chartBottomMargin: '3',
      },
      colorRange: {
        color: [
          {
            minValue: '850',
            maxValue: '1300',
            code: '#e5f1fe',
          },
          {
            minValue: '1300',
            maxValue: '1700',
            code: '#629bdb',
          },
          {
            minValue: '1700',
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
    },
  };
  const {
    type, renderAt, width, height, dataFormat, dataSource,
  } = chartConfigs;

  return (
    <ReactFC
      type={type}
      width={width}
      height={height}
      dataFormat={dataFormat}
      renderAt={renderAt}
      dataSource={dataSource}
    />
  );
}

export default Pressure;
