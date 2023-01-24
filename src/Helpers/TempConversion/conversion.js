const conversion = (temp, unitTemp) => {
  if (unitTemp === ' °C') {
    return { newTemp: ((9 / 5) * temp + 32).toFixed(2), newUnitTemp: ' °F' };
  }
  return { newTemp: ((temp - 32) * (5 / 9)).toFixed(2), newUnitTemp: ' °C' };
};

export default conversion;
