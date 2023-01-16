const conversion = (temp: number, unitTemp: string) => {
  if (unitTemp === ' °C') {
    return { temp: ((9 / 5) * temp + 32).toFixed(2), unitTemp: ' °F' };
  }
  return { temp: ((temp - 32) * (5 / 9)).toFixed(2), unitTemp: ' °C' };
};

export default conversion;
