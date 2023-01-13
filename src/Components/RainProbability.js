import React, { useContext } from 'react';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import allData from '../Context/allData';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

function RainProbability() {
  console.log(useContext(allData));
  const dailyData = useContext(allData).regular[0];

  const chartConfigs = {
    type: 'line',
    width: '100%',
    dataFormat: 'json',
    renderAt: 'chart-container',
    dataSource: {
      chart: {
        caption: 'Rain Probability in Upcoming Days',
        subCaption: 'Graph of Humidity in Different Days',
        // showValues: "1",
        showLegend: '1',
        showHoverEffect: '1',
        anchorHoverEffect: '1',
        showToolTip: '1',
        xAxisName: 'Date',
        yAxisName: 'Humidity',
        numberSuffix: '%',
        theme: 'fusion',
        labelStep: '8',
      },
      data: dailyData,
    },
  };
  const {
    type, width, dataFormat, renderAt, dataSource,
  } = chartConfigs;
  return (
    <ReactFC
      type={type}
      width={width}
      dataFormat={dataFormat}
      renderAt={renderAt}
      dataSource={dataSource}
    />
  );
}

export default RainProbability;
