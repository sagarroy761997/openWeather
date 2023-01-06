let latitude;
let longitude;
const getLocation = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
  }
  return [latitude, longitude];
};

export default getLocation;
