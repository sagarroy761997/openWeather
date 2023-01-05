import React, {useContext} from 'react';
import LocationContext from '../Context/LocationContext';
import * as Widgets from "fusioncharts/fusioncharts.widgets.js";
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme,Widgets);


const WindSpeed=()=>{
    const [windSpeed, setWindSpeed] = useContext(LocationContext).wind;
    const dataSource = {
        "chart": {
            "caption": "Wind Speed",
            "lowerLimit": "0",
            "upperLimit": "100",
            "theme": "fusion",
            
          },
          "colorRange": {
            "color": [{
                "minValue": "0",
                "maxValue": "35",
                
                code: "#e5f1fe",
              },
              {
                "minValue": "35",
                "maxValue": "70",
                
                code: "#629bdb",
              },
              {
                "minValue": "70",
                "maxValue": "100",
                code: "#0039cb",
              }
            ]
          },
            dials : {
                "dial": [
                    {"value": windSpeed*10 }
                ],
                
            },
    };
    const chartConfigs = {
        type:'angulargauge',
        renderAt: "chart-container",
        width: 300,
        // height: 300,
        dataFormat: 'json',
        dataSource: dataSource,
        showValue: 1
    };
    return (
        <ReactFC {...chartConfigs} />
    );
  }
export default WindSpeed;
