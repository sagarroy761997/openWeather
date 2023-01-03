import React,{ useContext }from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import LocationContext from "../Context/LocationContext";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Chart = () => {
  const [dailyData, setDailyData] = useContext(LocationContext);
  //   console.log(dailyData);
  const chartConfigs = {
    type: "area2d",
    width: "700",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Temp vs Rain",
        subCaption: "Rain Probability In Different Tempreture",
        xAxisName: "Temp",
        yAxisName: "Rain",
        numberSuffix: "%",
        theme: "fusion",
      },
      data: dailyData,
    },
  };
  return (
    <>
      <ReactFC {...chartConfigs} />
    </>
  );
};

export default Chart;
