import React, { useContext } from "react";
import LocationContext from "../Context/LocationContext";

import * as Widgets from "fusioncharts/fusioncharts.widgets.js";
import FusionCharts from "fusioncharts";

import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { Box } from "@mui/system";

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);
const FeelsLike = () => {
  const [feelsLike, setFeelsLike] = useContext(LocationContext).feelsLike;
  const dataSource = {
    chart: {
      caption: "What it feels like?",
      lowerLimit: "0",
      upperLimit: "100",
      showValue: "1",
      numberSuffix: "°C",
      theme: "fusion",
      showToolTip: "0",
    },
    colorRange: {
      color: [
        {
          minValue: "0",
          maxValue: "50",
          code: "#e5f1fe",
        },
        {
          minValue: "50",
          maxValue: "75",
          code: "#629bdb",
        },
        {
          minValue: "75",
          maxValue: "100",
          code: "#0039cb",
        },
      ],
    },
    pointers: {
      pointer: [
        {
          value: feelsLike,
        },
      ],
    },
  };
  const chartConfigs = {
    type: "hlineargauge",
    renderAt: "chart-container",
    width: "100%",
    height: 160,
    dataFormat: "json",
    dataSource: dataSource,
  };
  return <ReactFC {...chartConfigs} />;
};

export default FeelsLike;
