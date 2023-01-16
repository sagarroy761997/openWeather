/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from 'react';


const initialContextValue = {
  dailyData: [{label: '17 Dec 22 11:60', value: 62}],
    setDailyData: (state: Array<{label: string, value: number}>) => {} ,
    windSpeed: 3.4,
    setWindSpeed: (state: number) => {},
    pressure: 65,
    setPressure: (state: number) => {},
    feelsLike: 65,
    setFeelsLike:(state: number) => {},
    humidity: 65,
    setHumidity:(state: number) => {},
    differentCity:'malda' ,
    setDifferentCity: (state: string) => {},
}
let value:any
export const allData = createContext(value);

